import ContactForm from '../components/ContactForm';
import AnimateOnScroll from '../components/AnimateOnScroll';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <AnimateOnScroll animation="blur-in" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Ready to start your project? We&apos;d love to hear from you.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <AnimateOnScroll animation="slide-in-up" delay={0.2} threshold={0.01} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a message</h2>
              <ContactForm />
            </div>
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-primary mb-6">Office Address</h3>
                <address className="text-gray-600 not-italic space-y-4">
                  <p className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    123 Tech Park, Innovation Hub, Silicon Valley, CA 94000
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@velocrafts.tech
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 (555) 123-4567
                  </p>
                </address>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-200">
                <iframe
                  title="Velocrafts Technologies Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.434027686897!2d-122.08424968468205!3d37.422065979823755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <AnimateOnScroll animation="soft-zoom" delay={0.2} threshold={0.01} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Prefer to talk?</h2>
          <p className="text-gray-600 mb-6">
            Schedule a free consultation with our team to discuss your project.
          </p>
          <a
            href="mailto:contact@velocrafts.tech"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Schedule a Call
          </a>
        </AnimateOnScroll>
      </section>
    </>
  );
}
