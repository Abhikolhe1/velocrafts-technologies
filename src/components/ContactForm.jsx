import { useState } from 'react';

const serviceOptions = [
  'Web App Development',
  'Mobile App Development',
  'AI Workflows',
  'Digital Marketing',
  'UI/UX Design',
  'Cloud & DevOps',
  'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, would submit to API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Your name"
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="your@email.com"
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
          placeholder="Company name"
        />
      </div>
      <div>
        <label htmlFor="service" className={labelClass}>Service Interest</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={inputClass}
          aria-label="Select service interest"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={inputClass}
          placeholder="Tell us about your project..."
          aria-required="true"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#FFB400] text-[#153A5B] font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        Submit
      </button>
    </form>
  );
}
