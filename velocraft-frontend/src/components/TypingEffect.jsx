import { useState, useEffect } from "react"

export default function TypingEffect({ onShapeChange }) {
  const phrases = [
    "Digital Innovation",
    "Connected Solutions",
    "Future Technology"
  ]

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
          setTypingSpeed(150)
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1))
          setTypingSpeed(100)
        } else {
          // Move to next phrase
          setIsDeleting(false)
          const nextIndex = (currentPhraseIndex + 1) % phrases.length
          setCurrentPhraseIndex(nextIndex)
          
          // Notify parent about shape change
          if (onShapeChange) {
            onShapeChange(nextIndex)
          }
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentPhraseIndex, typingSpeed, onShapeChange])

  return (
    <>
      {displayedText}
      <span className="animate-pulse ml-1">|</span>
    </>
  )
}
