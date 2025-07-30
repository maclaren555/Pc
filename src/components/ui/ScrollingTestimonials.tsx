"use client";

import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { useEffect, useRef } from "react";

interface TestimonialData {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

interface ScrollingTestimonialsProps {
  testimonials: TestimonialData[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function ScrollingTestimonials({ 
  testimonials, 
  direction = 'left', 
  speed = 50,
  className = ""
}: ScrollingTestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollWidth = scrollElement.scrollWidth / 2; // Half because we duplicate content

    const animate = () => {
      const increment = speed / 60; // 60fps
      
      if (direction === 'left') {
        scrollPosition += increment;
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
        }
        scrollElement.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollPosition += increment;
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
        }
        scrollElement.style.transform = `translateX(${scrollPosition - scrollWidth}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [direction, speed]);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        ref={scrollRef}
        className="flex gap-6 w-fit"
        style={{ willChange: 'transform' }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

