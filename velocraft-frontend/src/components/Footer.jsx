import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const footerServices = [
  "Web App Development",
  "Mobile App Development",
  "Generative & Agentic AI Development",
  "AI Workflows & Model Training",
  "Digital Marketing & SEO",
  "UI/UX Design",
  "Cloud & DevOps Solutions",
  "Analytics & Insights",
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram", icon: "Instagram" },
];

function SocialIcon({ href, label }) {
  const paths = {
    LinkedIn:
      "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    Instagram:
      "M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.321 4 20 5.679 20 7.75v8.5C20 18.321 18.321 20 16.25 20h-8.5C5.679 20 4 18.321 4 16.25v-8.5C4 5.679 5.679 4 7.75 4zm4.25 2.5A5.75 5.75 0 1 0 17.75 12 5.757 5.757 0 0 0 12 6.5zm0 2A3.75 3.75 0 1 1 8.25 12 3.754 3.754 0 0 1 12 8.5zm4.5-.75a1.25 1.25 0 1 0 1.25 1.25A1.252 1.252 0 0 0 16.5 7.75z",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.5)",
      }}
      aria-label={label}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(129,140,248,0.15)";
        e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)";
        e.currentTarget.style.color = "#818CF8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
      }}
    >
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={paths[label]} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#030610",
        borderTop: "1px solid rgba(129,140,248,0.1)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(129,140,248,0.4) 30%, rgba(129,140,248,0.4) 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-3">
            <img
              src="/assets/logo/velocrafts updated logo.png"
              alt="Velocrafts Technologies"
              className="h-10 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Empowering businesses with cutting-edge digital solutions across
              web, mobile, AI, and growth services.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} href={s.href} label={s.icon} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "#818CF8" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h4
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "#818CF8" }}
            >
              Services
            </h4>
            <ul className="grid grid-cols-1 gap-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link
                    to="/#services"
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "#818CF8" }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <p>
                <a
                  href="mailto:contact@velocrafts.tech"
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  contact@velocrafts.tech
                </a>
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                +91 8605854811
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(129,140,248,0.3)]"
                  style={{ background: "#818CF8", color: "#050816" }}
                >
                  Get in Touch
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} Velocrafts Technologies. All rights reserved.
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#818CF8", boxShadow: "0 0 6px #818CF8" }} />
            <span>Built with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
