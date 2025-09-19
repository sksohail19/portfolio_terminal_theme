'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({ text, typingSpeed = 30, showCursor = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, [showCursor]);

  useEffect(() => {
    if (currentCharIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, text, typingSpeed]);

  return (
    <span className="text-type">
      {displayedText}
      {showCursor && <span ref={cursorRef} className="text-type__cursor">█</span>}
    </span>
  );
};

export default TextType;
