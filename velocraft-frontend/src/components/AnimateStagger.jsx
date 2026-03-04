import { Children, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Staggered card animations - cards appear one by one
 * Scroll Reveal Cards: fade + slide in on scroll
 */
const cardVariants = {
  'fade-in-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in-down': {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-in-up': {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-in-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-in-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'soft-zoom': {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  'blur-in': {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'lift-in': {
    hidden: { opacity: 0, y: 34, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

const cardTransitions = {
  'fade-in-up': { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  'fade-in-down': { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  'slide-in-up': { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  'slide-in-left': { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  'slide-in-right': { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  'soft-zoom': { duration: 0.72, ease: [0.34, 1.56, 0.64, 1] },
  'blur-in': { duration: 0.78, ease: [0.2, 0.8, 0.2, 1] },
  'lift-in': { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
};

export default function AnimateStagger({
  children,
  animation = 'fade-in-up',
  staggerDelay = 0.28,
  className = '',
  threshold = 0.1,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const childArray = Children.toArray(children);
  const itemVariant = cardVariants[animation] || cardVariants['fade-in-up'];
  const itemTransition = cardTransitions[animation] || cardTransitions['fade-in-up'];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={child?.key ?? index}
          variants={itemVariant}
          transition={itemTransition}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
