"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number | string;
  duration?: number; // in seconds
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState<number>(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
          setHasAnimated(true);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const target = Number(to) || 0; // fallback to 0 if NaN
    const totalFrames = duration * 60;
    const increment = (target - from) / totalFrames;
    let current = from;
    let frame = 0;

    const counter = setInterval(() => {
      current += increment;
      frame++;

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(target);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
  };

  return <span ref={ref} dir="ltr">{isNaN(count) ? 0 : count}</span>;
};

export default Counter;
