import { useState } from "react"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MorphingParticles from "./MorphingParticles"
import TypingEffect from "./TypingEffect"
import StatsCounter from "./StatsCounter"
import ScrollIndicator from "./ScrollIndicator"
import FloatingParticles from "./FloatingParticles"

export default function HeroNew() {
  const [currentShape, setCurrentShape] = useState(0)

  const handleShapeChange = (shapeIndex) => {
    setCurrentShape(shapeIndex)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1f3a 100%)' }}
    >
      {/* <FloatingParticles /> */}
      
      {/* Glowing gradient orbs */}
      <div
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,180,0,0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-20 bottom-20 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,180,0,0.3) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by 150+ businesses
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Empowering
              <br />
              <span className="text-accent">
                <TypingEffect onShapeChange={handleShapeChange} />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-white/80 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your ideas into reality with cutting-edge AI technology
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-accent text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg shadow-accent/25"
              >
                Get Started
              </Link>
              <a
                href="#services"
                className="w-full sm:w-auto border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Explore Services
              </a>
            </motion.div>

            {/* <StatsCounter /> */}
          </motion.div>

          {/* Right: 3D Morphing Particles */}
          <motion.div
            className="h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MorphingParticles currentShape={currentShape} />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
