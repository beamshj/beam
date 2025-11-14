"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Enhanced Card Component - Add this wrapper to your existing card
const EnhancedSchoolCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const magnetX = useSpring(0, springConfig);
  const magnetY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    const magnetStrength = 12;
    magnetX.set(normalizedX * magnetStrength);
    magnetY.set(normalizedY * magnetStrength);

    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    magnetX.set(0);
    magnetY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: magnetX,
        y: magnetY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Animated gradient border effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, #42BADC, #12586C, #42BADC, #42BADC)",
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "300% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Radial glow that follows cursor */}
      <div
        className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 186, 220, 0.1), transparent 40%)`,
        }}
      />

      {/* Pulsing glow behind card */}
      <motion.div
        className="absolute -inset-4 rounded-[20px] opacity-0 group-hover:opacity-100 blur-2xl -z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(66, 186, 220, 0.4), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Original card content */}
      <div className="relative" style={{
        transform: "translateZ(0)",
        WebkitFontSmoothing: "subpixel-antialiased",
        backfaceVisibility: "hidden",
      }}>
        {children}
      </div>
    </motion.div>
  );
};

export default EnhancedSchoolCard;
