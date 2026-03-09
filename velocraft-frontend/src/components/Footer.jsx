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
  const d = paths[label] || paths.GitHub;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-accent transition-colors"
      aria-label={label}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="text-white py-10"
      style={{
        background:"#153A5B",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-4">Velocrafts Technologies</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering businesses with cutting edge digital solutions across
              web, mobile, AI, and growth services.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2">
              {" "}
              {footerServices.map((s) => (
                <li key={s}>
                  <Link
                    to="/#services"
                    className="text-white/80 hover:text-accent transition-colors text-sm"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-white/80 text-sm mb-2">
              <a
                href="mailto:contact@velocrafts.tech"
                className="hover:text-accent transition-colors"
              >
                contact@velocrafts.tech
              </a>
            </p>
            <p className="text-white/80 text-sm mb-4">+91 8605854811</p>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} href={s.href} label={s.icon} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} Velocrafts Technologies. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
