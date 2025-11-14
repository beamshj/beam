import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Reusable Section Reveal Component
interface SectionRevealProps {
  children: React.ReactNode;
  revealType?: 'circle' | 'square' | 'diamond';
  className?: string;
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  revealType = 'circle',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "start 0.3"]
  });

  // Transform scroll progress to clip-path values
  const clipProgress = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const getClipPath = (progress: number) => {
    switch (revealType) {
      case 'circle':
        return `circle(${progress}% at 50% 50%)`;
      case 'square':
        return `inset(${40 - progress / 2}% ${50 - progress / 2}% round 0px)`;
      case 'diamond':
        return `polygon(
          ${50 - progress / 2}% 50%,
          50% ${50 - progress / 2}%,
          ${50 + progress / 2}% 50%,
          50% ${50 + progress / 2}%
        )`;
      default:
        return `circle(${progress}% at 50% 50%)`;
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        clipPath: useTransform(clipProgress, (value) => getClipPath(value)),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
