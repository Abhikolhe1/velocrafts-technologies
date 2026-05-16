import ContactForm from "../components/ContactForm";
import AnimateOnScroll from "../components/AnimateOnScroll";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-40 py-20 relative overflow-hidden"
        style={{ background: "var(--theme-surface-deep)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(129,140,248,0.12) 0%, transparent 60%)",
          }}
        />
        <AnimateOnScroll
          animation="blur-in"
          delay={0.2}
          threshold={0.01}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--theme-text)" }}
            >
              Contact Us
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: "var(--theme-text-2)" }}
            >
              Ready to start your project? We&apos;d love to hear from you.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Contact Form & Info Section */}
      <section
        className="py-20 md:py-28 overflow-x-hidden"
        style={{ background: "var(--theme-surface-alt)" }}
      >
        <AnimateOnScroll
          animation="slide-in-up"
          delay={0.2}
          threshold={0.01}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="min-w-0">
              <div
                className="rounded-xl p-6 sm:p-8 w-full"
                style={{
                  background: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "var(--theme-card-shadow-md)",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "var(--theme-text)" }}
                >
                  Send us a message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Right Column */}
            <div className="min-w-0">
              <div
                className="rounded-xl p-6 sm:p-8 mb-8 w-full"
                style={{
                  background: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "var(--theme-card-shadow-md)",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-6"
                  style={{ color: "var(--theme-text)" }}
                >
                  Office Address
                </h3>
                <address
                  className="not-italic space-y-4"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  <p className="flex items-start gap-3 min-w-0 break-words">
                    <svg
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    Kapadia Commercial Complex, 2nd Floor office No. 25/26,
                    Opposite Kalika Mandir, Gadkari Chowk, Near Tata Motors,
                    Nashik, Maharashtra 422002.
                  </p>

                  <p className="flex items-center gap-3 min-w-0 break-words">
                    <svg
                      className="w-5 h-5 text-accent shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    contact@velocrafts.tech
                  </p>

                  <p className="flex items-center gap-3 min-w-0 break-words">
                    <svg
                      className="w-5 h-5 text-accent shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +91 8605854811
                  </p>
                </address>
              </div>

              <div
                className="rounded-xl overflow-hidden aspect-video w-full"
                style={{
                  background: "var(--theme-surface-alt)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "var(--theme-card-shadow-md)",
                }}
              >
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3749.3781203073513!2d73.7833333!3d19.992638899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDU5JzMzLjUiTiA3M8KwNDcnMDAuMCJF!5e0!3m2!1sen!2sin!4v1772781279976!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section
        className="py-16"
        style={{ background: "var(--theme-surface)" }}
      >
        <AnimateOnScroll
          animation="soft-zoom"
          delay={0.2}
          threshold={0.01}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            Prefer to talk?
          </h2>
          <p
            className="mb-6"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Schedule a free consultation with our team to discuss your project.
          </p>
          <a
            href="mailto:contact@velocrafts.tech"
            className="inline-block font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: "#818CF8", color: "#050816" }}
          >
            Schedule a Call
          </a>
        </AnimateOnScroll>
      </section>
    </>
  );
}
