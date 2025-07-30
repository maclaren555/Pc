'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';
import { smoothScrollTo, getCurrentSection, getNextSection, getPreviousSection, scrollToTop } from '@/lib/smooth-scroll';

export function SectionNavigator() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentSection(getCurrentSection());
      setIsVisible(window.scrollY > 500); // Show after scrolling down a bit
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevious = () => {
    const prevSection = getPreviousSection(currentSection);
    if (prevSection) {
      smoothScrollTo(prevSection);
    } else {
      scrollToTop();
    }
  };

  const handleNext = () => {
    const nextSection = getNextSection(currentSection);
    if (nextSection) {
      smoothScrollTo(nextSection);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-2">
      {/* Back to Top Button - only show when not on hero */}
      {currentSection !== 'hero' && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-lg"
          title="Наверх"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      {/* Previous Section Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-lg"
        disabled={currentSection === 'hero'}
        title="Предыдущая секция"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      {/* Next Section Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-lg"
        disabled={currentSection === 'contact'}
        title="Следующая секция"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}