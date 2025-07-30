'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  animationType?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
}

export function AnimatedSection({ 
  children, 
  className, 
  id, 
  delay = 0,
  animationType = 'fade-up'
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  const reducedMotion = useReducedMotion();

  const getAnimationClasses = () => {
    // If user prefers reduced motion, just show/hide without animations
    if (reducedMotion) {
      return cn(
        'transition-opacity duration-300 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0'
      );
    }

    const baseClasses = 'transition-all duration-700 ease-out';
    
    switch (animationType) {
      case 'fade-in':
        return cn(
          baseClasses,
          isVisible ? 'opacity-100' : 'opacity-0'
        );
      case 'slide-left':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        );
      case 'slide-right':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        );
      case 'scale-up':
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        );
      case 'fade-up':
      default:
        return cn(
          baseClasses,
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        );
    }
  };

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        getAnimationClasses(),
        className
      )}
      style={{
        transitionDelay: isVisible && !reducedMotion ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </section>
  );
}