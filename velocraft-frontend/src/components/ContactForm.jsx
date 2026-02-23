import { useState, useRef } from 'react';
import TurnstileWidget from './TurnstileWidget';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const turnstileTokenRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTurnstileVerify = (token) => {
    turnstileTokenRef.current = token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileTokenRef.current) {
      setError('Please complete the verification below.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          service: formData.service || undefined,
          message: formData.message,
          turnstileToken: turnstileTokenRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error?.message || data.message || 'Failed to submit');
      alert(data.message || 'Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      turnstileTokenRef.current = null;
      setTurnstileKey((k) => k + 1); // Reset Turnstile for next submit
    } catch (err) {
      const msg = err.message || 'Something went wrong. Please try again.';
      setError(err.name === 'TypeError' && err.message?.includes('fetch') ? 'Cannot reach server. Is the backend running?' : msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{error}</div>
      )}
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
      <TurnstileWidget key={turnstileKey} onVerify={handleTurnstileVerify} />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FFB400] text-[#153A5B] font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
