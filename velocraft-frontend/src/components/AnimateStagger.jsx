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
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
