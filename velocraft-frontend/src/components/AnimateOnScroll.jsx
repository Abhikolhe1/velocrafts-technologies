import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Text animations (AOS/Framer style)
 * - fade-in-up: Text from bottom + fades in
 * - fade-in-down: Text from top + fades in
 * - slide-in-up: Stronger upward movement (hero headings)
 * - mask-reveal: Text appears from behind mask (luxury style)
 */
const variants = {
  'fade-in-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-in-up': {
    hidden: { opacity: 0.6, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  'mask-reveal': {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-in-left': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-in-right': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

const transition = {
  duration: 1.2,
  delay: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function AnimateOnScroll({
  children,
  animation = 'fade-in-up',
  delay = 0.4,
  duration = 1.2,
  className = '',
  threshold = 0.05,
  as: Component = motion.div,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variant = variants[animation] || variants['fade-in-up'];

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variant}
      transition={{
        ...transition,
        delay,
        duration,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
