import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface H2TitleProps {
  titleText: string;
  titleColor?: string;
  textAlign?: string;
  maxWidth?: string;
  splitType?: 'letter' | 'word' | 'line';
}

const H2Title = ({
  titleText,
  titleColor,
  textAlign,
  maxWidth,
  splitType = 'word',
}: H2TitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = titleRef.current;
    if (!element) return;

    element.innerHTML = '';

    let splitElements: HTMLElement[] = [];

    switch (splitType) {
      case 'letter':
        splitElements = titleText.split('').map((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(100px)';
          element.appendChild(span);
          return span;
        });
        break;

      case 'word':
        const words = titleText.split(' ');

        words.forEach((word, index) => {
          if (word !== '') {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100px)';
            element.appendChild(span);
            splitElements.push(span);
          }

          // Add space after each word except the last one
          if (index < words.length - 1) {
            const space = document.createElement('span');
            space.textContent = '\u00A0'; // non-breaking space
            space.style.display = 'inline-block';
            element.appendChild(space);
          }
        });
        break;

      case 'line':
        const lines = titleText.split('\n').filter(line => line.trim() !== '');
        splitElements = lines.map((line, index) => {
          const span = document.createElement('span');
          span.textContent = line;
          span.style.display = 'block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(100px)';
          element.appendChild(span);
          return span;
        });
        break;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
        // markers: process.env.NODE_ENV === 'development',
      }
    });

    tl.to(splitElements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [titleText, splitType]);

  return (
    <h2
      ref={titleRef}
      className={`sbt-fz font-light leading-[1.111111111111111] ${titleColor || "text-black"} ${textAlign || "text-left"} 
       lettersp-4`} style={{ maxWidth: maxWidth }}
    >
      {titleText}
    </h2>
  );
};

export default H2Title;