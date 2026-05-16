import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Digital Innovation", "Connected Solutions", "Future Technology"];

const CODE_LINES = [
  { prompt: "$",  text: "velocrafts init --project=enterprise", color: "#818CF8", delay: 0.5 },
  { prompt: "›",  text: "Analyzing requirements...",            color: "#6b7280", delay: 1.0 },
  { prompt: "›",  text: "Architecting scalable system...",      color: "#6b7280", delay: 1.4 },
  { prompt: "›",  text: "Setting up CI/CD pipeline...",         color: "#6b7280", delay: 1.8 },
  { prompt: "✓",  text: "Infrastructure ready",                 color: "#4ade80", delay: 2.3 },
  { prompt: "✓",  text: "30+ clients served globally",          color: "#4ade80", delay: 2.6 },
  { prompt: "✓",  text: "20+ production apps deployed",         color: "#4ade80", delay: 2.9 },
  { prompt: "✓",  text: "10+ AI models in production",          color: "#4ade80", delay: 3.2 },
  { prompt: "$",  text: "velocrafts deploy --env=production",   color: "#818CF8", delay: 3.6 },
  { prompt: "✓",  text: "Deployment successful 🚀",             color: "#4ade80", delay: 4.1 },
];

const TECH_BADGES = [
  { icon: "⚛",  label: "React & Next.js",  pos: { top: "-16px",   right: "24px"  } },
  { icon: "📱",  label: "Flutter",           pos: { top: "22%",     right: "-24px" } },
  { icon: "🤖",  label: "Generative AI",    pos: { bottom: "34%",  right: "-20px" } },
  { icon: "☁️",  label: "Cloud & DevOps",   pos: { bottom: "-16px", left: "32px"  } },
  { icon: "🐍",  label: "Python & ML",      pos: { top: "16%",     left: "-24px"  } },
  { icon: "🔒",  label: "Enterprise Sec",   pos: { bottom: "20%",  left: "-20px"  } },
];

/* ── Floating proof chips that appear around the heading ── */
const PROOF_CHIPS = [
  {
    value: "30+",
    label: "Clients",
    sub: "worldwide",
    color: "#818CF8",
    pos: { top: "38px", right: "-8px" },
    delay: 1.2,
    floatDir: -1,
  },
  {
    value: "100%",
    label: "Satisfaction",
    sub: "guaranteed",
    color: "#4ade80",
    pos: { bottom: "56px", right: "-8px" },
    delay: 1.5,
    floatDir: 1,
  },
];

function FloatingChips() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proof-chip", ref.current).forEach((chip) => {
        const dir = parseFloat(chip.dataset.dir ?? "1");
        gsap.to(chip, {
          y: dir * 10,
          duration: 2.8 + Math.random() * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="hidden xl:block">
      {PROOF_CHIPS.map((chip, i) => (
        <div
          key={i}
          data-dir={chip.floatDir}
          className="proof-chip absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs opacity-0"
          style={{
            ...chip.pos,
            background: "var(--theme-surface)",
            border: `1px solid ${chip.color}22`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px ${chip.color}10`,
            animation: `heroWordIn 0.6s ${0.2 + i * 0.18}s cubic-bezier(0.22,1,0.36,1) forwards`,
          }}
        >
          <span
            className="text-lg font-bold leading-none"
            style={{ color: chip.color }}
          >
            {chip.value}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold" style={{ color: "var(--theme-text)", fontSize: "11px" }}>
              {chip.label}
            </span>
            <span style={{ color: "var(--theme-text-muted)", fontSize: "10px" }}>
              {chip.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Terminal (right side) ── */
function HeroTerminal() {
  const ref = useRef(null);
  const notifRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressPctRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".code-line", ref.current).forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          x: -8,
          duration: 0.35,
          delay: CODE_LINES[i]?.delay ?? i * 0.4,
          ease: "power2.out",
        });
      });

      gsap.to(".term-cursor", {
        opacity: 0,
        duration: 0.55,
        ease: "steps(1)",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray(".tech-badge", ref.current).forEach((badge, i) => {
        gsap.to(badge, {
          y: i % 2 === 0 ? -9 : 9,
          duration: 2.2 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to(".term-glow", {
        opacity: 0.65,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const pObj = { pct: 0 };
      gsap.to(pObj, {
        pct: 100,
        duration: 3.8,
        delay: 1.5,
        ease: "power1.inOut",
        onUpdate() {
          if (progressBarRef.current)
            progressBarRef.current.style.width = `${pObj.pct.toFixed(0)}%`;
          if (progressPctRef.current)
            progressPctRef.current.textContent = `${Math.round(pObj.pct)}%`;
        },
      });

      gsap.set(notifRef.current, { opacity: 0, y: 12, scale: 0.95 });
      gsap.to(notifRef.current, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, delay: 4.5,
        ease: "back.out(1.5)",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block">
      <div
        className="term-glow absolute -inset-10 rounded-3xl pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(129,140,248,0.18) 0%, transparent 68%)",
        }}
      />

      {/* Notification */}
      <div
        ref={notifRef}
        className="absolute -top-12 right-2 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium z-20 pointer-events-none"
        style={{
          background: "rgba(74,222,128,0.09)",
          border: "1px solid rgba(74,222,128,0.22)",
          color: "#4ade80",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
        />
        <span>Deployment successful</span>
        <span style={{ color: "#6b7280", marginLeft: "2px" }}>· just now</span>
      </div>

      {/* Terminal */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--theme-terminal)",
          border: "1px solid rgba(129,140,248,0.2)",
          boxShadow:
            "0 0 0 1px var(--theme-surface-subtle), 0 28px 64px rgba(0,0,0,0.45)",
        }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3.5"
          style={{
            background: "var(--theme-terminal-bar)",
            borderBottom: "1px solid var(--theme-border-sm)",
          }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
          <span
            className="ml-3 text-xs tracking-wide"
            style={{ color: "#4b5263", fontFamily: "monospace" }}
          >
            velocrafts-build.sh
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(74,222,128,0.1)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.15)",
                fontFamily: "monospace",
              }}
            >
              LIVE
            </span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(129,140,248,0.4)" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(129,140,248,0.25)" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(129,140,248,0.12)" }} />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-2" style={{ fontFamily: "monospace" }}>
          {CODE_LINES.map((line, i) => (
            <div key={i} className="code-line flex items-start gap-3 text-sm">
              <span
                className="flex-shrink-0 font-bold w-4 text-center"
                style={{ color: line.color }}
              >
                {line.prompt}
              </span>
              <span style={{ color: line.color }}>
                {line.text}
                {i === CODE_LINES.length - 1 && (
                  <span className="term-cursor" style={{ color: "#818CF8", marginLeft: "1px" }}>▋</span>
                )}
              </span>
            </div>
          ))}

          <div className="pt-3 mt-1" style={{ borderTop: "1px solid rgba(129,140,248,0.08)" }}>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span style={{ color: "#818CF8", fontFamily: "monospace" }}>building production bundle</span>
              <span ref={progressPctRef} style={{ color: "#6b7280" }}>0%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(129,140,248,0.1)" }}>
              <div
                ref={progressBarRef}
                className="h-full rounded-full"
                style={{ width: "0%", background: "linear-gradient(90deg, #818CF8, #6366F1)" }}
              />
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between px-5 py-2 text-xs"
          style={{
            background: "var(--theme-terminal-bar)",
            borderTop: "1px solid var(--theme-border-sm)",
            fontFamily: "monospace",
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "#4b5263" }}>branch:</span>
            <span style={{ color: "#818CF8" }}>main</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "#4b5263" }}>env:</span>
            <span style={{ color: "#4ade80" }}>production</span>
          </div>
        </div>
      </div>

      {TECH_BADGES.map((badge, i) => (
        <div
          key={i}
          className="tech-badge absolute hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
          style={{
            ...badge.pos,
            background: "var(--theme-surface)",
            border: "1px solid rgba(129,140,248,0.15)",
            color: "var(--theme-text-2)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span>{badge.icon}</span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}

/* ── Main section ── */
export default function HeroSection() {
  const heroRef     = useRef(null);
  const badgeRef    = useRef(null);
  const charWrapRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnsRef     = useRef(null);
  const contentRef  = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(badgeRef.current, {
        y: -30, opacity: 0, duration: 0.7, ease: "back.out(1.7)",
      })
        .from(
          charWrapRef.current.querySelectorAll(".hero-char"),
          { y: "120%", opacity: 0, duration: 0.9, stagger: 0.04, ease: "power4.out" },
          "-=0.4"
        )
        .from(subtitleRef.current, { y: 25, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(
          btnsRef.current.children,
          { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
        );

      gsap.to(contentRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--theme-bg)" }}
    >
      {/* Background glows */}
      <div
        className="absolute -right-48 -top-48 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 60%)" }}
      />
      <div
        className="absolute -left-48 bottom-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:py-0 lg:min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* ── Left ── */}
          <div ref={contentRef} className="relative z-10 text-center lg:text-left">

            {/* Floating proof chips — only xl+ */}
            <FloatingChips />

            {/* Trust badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                border: "1px solid rgba(129,140,248,0.3)",
                background: "rgba(129,140,248,0.08)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium tracking-wide">
                Trusted by 30+ businesses
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4"
              style={{ color: "var(--theme-text)" }}
            >
              <div
                ref={charWrapRef}
                className="flex flex-wrap justify-center lg:justify-start"
              >
                {"Empowering".split("").map((char, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <span className="hero-char inline-block">{char}</span>
                  </span>
                ))}
              </div>
              <div className="overflow-hidden mt-1" style={{ height: "1.15em" }}>
                <span
                  key={wordIdx}
                  className="inline-block"
                  style={{
                    color: "#818CF8",
                    animation: "heroWordIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
                  }}
                >
                  {WORDS[wordIdx]}
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Transform your ideas into reality with cutting-edge AI technology.
              We build scalable, high-performance applications that drive real growth.
            </p>

            {/* CTA buttons */}
            <div
              ref={btnsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(129,140,248,0.5)]"
                style={{ background: "#818CF8", color: "#050816" }}
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#services"
                className="hover-glass inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{ border: "1px solid var(--theme-border-md)", color: "var(--theme-text)" }}
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <HeroTerminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span
          className="text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--theme-scroll-track)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 overflow-hidden rounded-full"
          style={{ background: "var(--theme-border)" }}
        >
          <div
            style={{
              width: "100%",
              height: "40%",
              background: "#818CF8",
              animation: "scrollDrop 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
