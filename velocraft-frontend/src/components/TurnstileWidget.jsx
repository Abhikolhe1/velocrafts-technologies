import { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile CAPTCHA widget (explicit rendering).
 * Uses VITE_TURNSTILE_SITE_KEY from env. Falls back to test key if not set.
 */
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function TurnstileWidget({ onVerify }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onVerifyRef = useRef(onVerify);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderWidget = () => {
      if (containerRef.current && widgetIdRef.current == null && window.turnstile?.render) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'light',
          size: 'normal',
          callback: (token) => onVerifyRef.current?.(token),
          'expired-callback': () => onVerifyRef.current?.(null),
        });
      }
    };

    if (typeof window.turnstile !== 'undefined' && window.turnstile.render) {
      renderWidget();
    } else {
      const check = setInterval(() => {
        if (window.turnstile?.render) {
          clearInterval(check);
          renderWidget();
        }
      }, 50);
      return () => clearInterval(check);
    }

    return () => {
      if (widgetIdRef.current != null && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="my-4" />;
}
