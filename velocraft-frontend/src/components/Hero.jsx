import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";
import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 0, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 180, 0, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

const floatingPills = [
  { label: "Web", delay: 0 },
  { label: "Mobile", delay: 0.1 },
  { label: "AI", delay: 0.2 },
  { label: "Cloud", delay: 0.3 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full max-w-full min-w-0 flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #153A5B 0%, #0F576F 50%, #0a3d52 100%)",
      }}
    >
      <ParticleBackground />

      {/* Glowing gradient orb */}
      <div
        className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,0,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-20 bottom-20 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,0,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full min-w-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <Motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by 150+ businesses
            </Motion.span>
            <Motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Empowering{" "}
              <span
                className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto" }}
              >
                Digital
              </span>{" "}
              Innovation
            </Motion.h1>
            <Motion.p
              className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Web, Mobile, AI Services & Growth Solutions that scale with your
              vision.
            </Motion.p>
            <Motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <CtaButton
                to="/contact"
                variant="primary"
                className="w-full sm:w-auto shadow-lg shadow-accent/25 hover:scale-105"
              >
                Get Started
              </CtaButton>
              <CtaButton
                href="#services"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Explore Services
              </CtaButton>
            </Motion.div>
          </div>

          {/* Right: Floating service pills (desktop) */}
          <div className="hidden lg:flex relative h-64 items-center justify-center">
            {floatingPills.map((pill, i) => (
              <Motion.div
                key={pill.label}
                className="absolute px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 + pill.delay },
                  scale: { duration: 0.5, delay: 0.6 + pill.delay },
                  y: {
                    duration: 3,
                    delay: 1.5 + pill.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  left: `${20 + i * 22}%`,
                  top: `${15 + (i % 2) * 45}%`,
                }}
              >
                {pill.label}
              </Motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <Motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <Motion.div
            className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Motion.div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
