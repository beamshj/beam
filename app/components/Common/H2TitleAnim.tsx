import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface H2TitleProps {
  titleText: string;
  titleColor?: string;
  textAlign?: string;
  maxWidth?: string;
}

const H2Title = ({ titleText, titleColor, textAlign, maxWidth }: H2TitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const element = titleRef.current;
    if (!element) return;

    // Split text into individual characters
    const text = element.textContent || '';
    element.innerHTML = '';
    
    // Create spans for each character
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px)';
      element.appendChild(span);
      return span;
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%', // When element is 80% visible
        once: true, // Animate only once
        // markers: process.env.NODE_ENV === 'development', 
      }
    });

    // Animate each character with stagger effect
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05, // Delay between characters
      ease: 'power2.out',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [titleText]); // Re-run when titleText changes

  return ( 
    <h2 
      ref={titleRef}
      className={`text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-[1.111111111111111] ${titleColor || "text-black"} ${textAlign || "text-left"} 
      ${maxWidth ? `max-w-[${maxWidth}]` : ""} lettersp-4`}
    >
      {titleText}
    </h2>
  );
};

export default H2Title;