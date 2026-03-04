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
  'blur-in': {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'soft-zoom': {
    hidden: { opacity: 0, y: 20, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  'lift-in': {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
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

const animationTransitions = {
  'fade-in-up': { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] },
  'fade-in-down': { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] },
  'slide-in-up': { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  'mask-reveal': { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  'blur-in': { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  'soft-zoom': { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] },
  'lift-in': { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  'fade-in': { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  'slide-in-left': { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  'slide-in-right': { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export default function AnimateOnScroll({
  children,
  animation = 'fade-in-up',
  delay = 0.4,
  duration,
  className = '',
  threshold = 0.05,
  as: Component = motion.div,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variant = variants[animation] || variants['fade-in-up'];
  const transition = animationTransitions[animation] || animationTransitions['fade-in-up'];

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variant}
      transition={{
        ...transition,
        delay,
        ...(duration != null ? { duration } : {}),
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
