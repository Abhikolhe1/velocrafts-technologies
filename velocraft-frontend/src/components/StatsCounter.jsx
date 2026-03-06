import { useState, useEffect, useRef } from "react"

export default function StatsCounter() {
  const [counts, setCounts] = useState({ projects: 0, clients: 0, success: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounters()
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        projects: Math.floor(1000 * progress),
        clients: Math.floor(150 * progress),
        success: Math.floor(98 * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts({ projects: 1000, clients: 150, success: 98 })
      }
    }, interval)
  }

  return (
    <div ref={statsRef} className="flex items-center justify-between gap-6 mt-8">
      <div className="text-center flex-1">
        <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
          {counts.projects}+
        </div>
        <div className="text-sm text-white/60 uppercase tracking-wider">
          Projects
        </div>
      </div>
      
      <div className="w-px h-12 bg-white/20"></div>
      
      <div className="text-center flex-1">
        <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
          {counts.clients}+
        </div>
        <div className="text-sm text-white/60 uppercase tracking-wider">
          Clients
        </div>
      </div>
      
      <div className="w-px h-12 bg-white/20"></div>
      
      <div className="text-center flex-1">
        <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
          {counts.success}%
        </div>
        <div className="text-sm text-white/60 uppercase tracking-wider">
          Success Rate
        </div>
      </div>
    </div>
  )
}
