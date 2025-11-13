
"use client";
import React, { useRef, useState, ReactNode } from "react";

interface SparkleProps {
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
}

interface SparkleCardProps {
  children: ReactNode;
  index: number;
}

interface Sparkle extends SparkleProps {
  id: number;
}

// Sparkle particle component
const Sparkle: React.FC<SparkleProps> = ({ x, y, color, delay, duration }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animation: `sparkle ${duration}ms ease-out forwards`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className="w-1 h-1 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced Card Component with sparkle effect
const SparkleCard: React.FC<SparkleCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const sparkleIdRef = useRef(0);

  const colors = ['#42BADC', '#12586C', '#60D5F5', '#2A8FA0'];

  const createSparkle = (x: number, y: number) => {
    const sparkle = {
      id: sparkleIdRef.current++,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: 0,
      duration: 800 + Math.random() * 400,
    };

    setSparkles(prev => [...prev, sparkle]);

    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
    }, sparkle.duration + sparkle.delay);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create sparkles at random intervals
    if (Math.random() > 0.7) {
      createSparkle(x, y);
      // Create additional sparkles nearby
      if (Math.random() > 0.5) {
        createSparkle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      style={{ isolation: 'isolate' }}
    >
      {/* Sparkles container */}
      <div className="absolute inset-0 overflow-hidden rounded-[15px] pointer-events-none z-20">
        {sparkles.map(sparkle => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
      </div>

      {/* Gradient glow on hover */}
      <div
        className="absolute -inset-[2px] rounded-[17px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: 'linear-gradient(90deg, #42BADC, #12586C, #42BADC)',
          backgroundSize: '200% 100%',
          animation: isHovered ? 'gradientFlow 3s linear infinite' : 'none',
        }}
      />

      {/* Original card content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SparkleCard;
