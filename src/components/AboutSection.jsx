import { useEffect, useState } from 'react';

const metrics = [
  { value: 150, suffix: '+', label: 'Clients Served' },
  { value: 200, suffix: '+', label: 'Apps Built' },
  { value: 50, suffix: '+', label: 'Models Trained' },
  { value: 12, suffix: '', label: 'Global Partners' },
];

function AnimatedCounter({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - About Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">About Velocrafts</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Velocrafts Technologies, we are committed to empowering businesses through innovative digital solutions. 
              Our mission is to transform ideas into scalable, high-performance applications that drive growth and efficiency.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We combine cutting-edge technology with deep domain expertise to deliver web applications, mobile solutions, 
              AI workflows, and growth strategies. Our values of innovation, quality, and client success guide everything we do.
            </p>
            <a
              href="#contact"
              className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Connect With Us
            </a>
          </div>

          {/* Right - Metrics */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100 hover:border-accent/30 transition-colors"
              >
                <div
                  className="text-3xl md:text-4xl font-bold text-primary mb-2"
                  style={{ color: '#153A5B' }}
                >
                  <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-gray-600 font-medium">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
