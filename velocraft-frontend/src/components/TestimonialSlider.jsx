import { useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const testimonials = [
  {
    quote:
      "Velocrafts delivered our mobile app on time and exceeded our expectations. Their team's expertise in Flutter and attention to detail made the entire process smooth.",
    name: "Sarah Chen",
    role: "CEO",
    company: "HealthBridge",
    avatar: "SC",
  },
  {
    quote:
      "We partnered with Velocrafts for our AI-driven analytics platform. They understood our requirements deeply and built a solution that has transformed our operations.",
    name: "Michael Roberts",
    role: "CTO",
    company: "DataFlow Inc",
    avatar: "MR",
  },
  {
    quote:
      "From initial concept to deployment, Velocrafts was professional and responsive. Our e-commerce platform has seen a 60% increase in conversions since launch.",
    name: "Emma Wilson",
    role: "Marketing Director",
    company: "ShopEase",
    avatar: "EW",
  },
];

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#1C4A73]">
      {" "}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animation="soft-zoom" delay={0.2} threshold={0.01}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What Our Clients Say
          </h2>
        </AnimateOnScroll>

        <div className="relative">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i === activeIndex ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <blockquote className="text-xl md:text-2xl text-white/95 text-center leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-primary font-bold bg-accent"
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-white/80 text-sm">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "bg-accent w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
