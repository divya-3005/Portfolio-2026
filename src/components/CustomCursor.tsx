'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [magneticPos, setMagneticPos] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const cursorWidth = useSpring(16, springConfig);
  const cursorHeight = useSpring(16, springConfig);
  const cursorRadius = useSpring(8, springConfig);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!magneticPos) {
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
      } else {
        // Calculate pull effect
        const boundsCenterX = magneticPos.x + magneticPos.width / 2;
        const boundsCenterY = magneticPos.y + magneticPos.height / 2;
        
        const distanceX = e.clientX - boundsCenterX;
        const distanceY = e.clientY - boundsCenterY;
        
        // Pull the cursor slightly towards the mouse within the button
        cursorX.set(boundsCenterX - (magneticPos.width / 2) + distanceX * 0.1);
        cursorY.set(boundsCenterY - (magneticPos.height / 2) + distanceY * 0.1);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, input, [data-cursor]') as HTMLElement;
      
      if (interactiveEl) {
        setIsHovering(true);
        const rect = interactiveEl.getBoundingClientRect();
        
        // If it's a specific "magnetic" element (we can just apply it to minimal-links or small buttons)
        // For broad compatibility in this minimalist layout, we will just scale the dot and snap it 
        // to the center, or just expand it slightly.
        if (interactiveEl.classList.contains('minimal-link')) {
          setMagneticPos({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
          cursorWidth.set(rect.width + 16);
          cursorHeight.set(rect.height + 8);
          cursorRadius.set(8);
          // Snap instantly to the center of the element, then let mouseMove handle the pull
          cursorX.set(rect.left - 8);
          cursorY.set(rect.top - 4);
        } else {
          // Standard hover (just grow the dot)
          setMagneticPos(null);
          cursorWidth.set(64);
          cursorHeight.set(64);
          cursorRadius.set(32);
          cursorX.set(e.clientX - 32);
          cursorY.set(e.clientY - 32);
        }
      } else {
        setIsHovering(false);
        setMagneticPos(null);
        cursorWidth.set(16);
        cursorHeight.set(16);
        cursorRadius.set(8);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, cursorWidth, cursorHeight, cursorRadius, magneticPos]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x: cursorX, 
          y: cursorY,
          width: cursorWidth,
          height: cursorHeight,
          borderRadius: cursorRadius
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />
    </>
  );
}
