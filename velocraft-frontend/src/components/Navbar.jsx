import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = isDark
    ? scrolled ? "rgba(5,8,22,0.95)" : "rgba(5,8,22,0.75)"
    : scrolled ? "rgba(245,247,255,0.95)" : "rgba(245,247,255,0.75)";

  const borderColor = scrolled
    ? "1px solid rgba(129,140,248,0.12)"
    : isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.06)";

  const linkColor = (isActive) =>
    isActive ? "#818CF8" : isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";

  const mobileLinkColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const mobilePanelBg = isDark ? "rgba(13,16,32,0.97)" : "rgba(245,247,255,0.97)";
  const mobilePanelBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
  const toggleColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)";
  const toggleHoverBg = isDark ? "hover:bg-white/5" : "hover:bg-black/5";
  const hamburgerColor = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: borderColor,
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Velocrafts Technologies Home"
          >
            <img
              src="/assets/logo/velocrafts updated logo.png"
              alt=""
              className="h-30 sm:h-32 md:h-34 lg:h-30 w-auto"
              style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }}
              aria-hidden="true"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors duration-200"
                end={link.to === "/"}
                style={({ isActive }) => ({ color: linkColor(isActive) })}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-2 rounded-lg transition-colors duration-200 ${toggleHoverBg}`}
              style={{ color: toggleColor }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]"
              style={{ background: "#818CF8", color: "#050816" }}
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-2 rounded-lg transition-colors duration-200 ${toggleHoverBg}`}
              style={{ color: toggleColor }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              className={`p-2 rounded-lg transition-colors duration-200 ${toggleHoverBg}`}
              style={{ color: hamburgerColor }}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}
        >
          <div
            className="flex flex-col gap-1 pt-2 pb-2 rounded-xl mt-1 px-2"
            style={{
              background: mobilePanelBg,
              border: `1px solid ${mobilePanelBorder}`,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${toggleHoverBg}`}
                style={{ color: mobileLinkColor }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 pt-2">
              <Link
                to="/contact"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ background: "#818CF8", color: "#050816" }}
                onClick={() => setIsOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
