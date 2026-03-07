import { useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import MorphingParticles from "./MorphingParticles";
import TypingEffect from "./TypingEffect";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroNew() {
  const [currentShape, setCurrentShape] = useState(0);

  const handleShapeChange = (shapeIndex) => {
    setCurrentShape(shapeIndex);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start pt-20 lg:pt-0 lg:items-center overflow-hidden"
      style={{ background: "#fff" }}
    >
      {/* <FloatingParticles /> */}

      {/* Glowing gradient orbs */}
      <div
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,0,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-20 bottom-20 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,0,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:py-16 md:py-24 lg:py-32">
        {" "}
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {" "}
          {/* Left: Content */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm lg:hidden z-0" />
          <Motion.div
            className="relative z-10 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by 30+ businesses
            </Motion.span>

            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight whitespace-normal lg:whitespace-nowrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Empowering <br />
              <span className="text-accent">
                <TypingEffect onShapeChange={handleShapeChange} />
              </span>
            </Motion.h1>

            <Motion.p
              className="text-lg text-black/80 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your ideas into reality with cutting-edge AI technology
            </Motion.p>

            <Motion.div
              className="hidden lg:flex flex-col sm:flex-row gap-4 lg:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-accent text-primary font-semibold px-8 py-4 rounded-lg shadow-lg shadow-accent/25"
              >
                Get Started
              </Link>

              <a
                href="#services"
                className="w-full sm:w-auto bg-accent text-primary font-semibold px-8 py-4 rounded-lg shadow-lg shadow-accent/25"
              >
                Explore Services
              </a>
            </Motion.div>

            {/* <StatsCounter /> */}
          </Motion.div>
          {/* Right: 3D Morphing Particles */}
          <Motion.div
            className="absolute inset-0 z-0 lg:relative lg:inset-auto lg:z-auto h-[180%] lg:h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MorphingParticles currentShape={currentShape} />
          </Motion.div>
        </div>
      </div>

      {/* Mobile Get Started Button (Hero Only) */}
      <div className="lg:hidden absolute bottom-24 left-0 w-full px-6 z-20">
        <Link
          to="/contact"
          className="block w-full bg-accent text-primary font-semibold px-8 py-4 rounded-lg text-center shadow-lg shadow-accent/25"
        >
          Get Started
        </Link>
      </div>
      <ScrollIndicator />
    </section>
  );
}
