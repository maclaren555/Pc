'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import { useResponsive } from '@/hooks/useResponsive';

const navigationItems = [
  { id: 'advantages', label: 'Преимущества', href: '#advantages' },
  { id: 'examples', label: 'Примеры работ', href: '#examples' },
  { id: 'testimonials', label: 'Отзывы', href: '#testimonials' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Контакты', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isTouch, isSmallScreen } = useResponsive();


  useEffect(() => {
    const handleScroll = () => {
      // Update navigation background opacity based on scroll
      setIsScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close mobile menu on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${isScrolled
        ? 'bg-transparent'
        : 'bg-background/60 backdrop-blur-sm'
        }`}>
        <div className={`container mx-auto px-4`}>
          <div className={`flex items-center transition-all duration-500 ${isScrolled
            ? `${isTouch ? 'h-16' : 'h-14'} bg-background/95 backdrop-blur-md rounded-full px-6 my-2 shadow-md border border-border/50`
            : (isTouch ? 'h-20' : 'h-16')
            }`}>
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className={`flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md ${isTouch ? 'p-2' : 'p-1'}`}
              aria-label="Перейти на главную страницу"
            >
              <div className={`${isTouch ? 'w-10 h-10' : 'w-8 h-8'} bg-primary rounded-lg flex items-center justify-center`}>
                <span className={`text-white font-bold ${isTouch ? 'text-base' : 'text-sm'}`} aria-hidden="true">PC</span>
              </div>
              <span className={`font-bold ${isTouch ? 'text-xl' : 'text-lg'} ${isSmallScreen ? 'hidden sm:block' : ''}`}>Gaming PC</span>
            </button>

            {/* Desktop Menu - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1" role="navigation" aria-label="Основная навигация">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size={isTouch ? "default" : "sm"}
                  onClick={() => scrollToSection(item.id)}
                  className={`${isTouch ? 'text-base px-4 py-2' : 'text-sm'} transition-all duration-200 hover:bg-primary hover:text-primary-foreground`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* CTA Button - Desktop */}
              <Button
                onClick={() => scrollToSection('builder')}
                className={`hidden md:flex bg-purple-600 hover:bg-purple-700 text-white ${isTouch ? 'text-base px-6 py-2' : 'text-sm px-4 py-2'} transition-all duration-200`}
              >
                Подобрать ПК
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size={isTouch ? "default" : "icon"}
                className={`lg:hidden ${isTouch ? 'min-w-[44px] min-h-[44px]' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className={`${isTouch ? 'h-6 w-6' : 'h-5 w-5'}`} />
                ) : (
                  <Menu className={`${isTouch ? 'h-6 w-6' : 'h-5 w-5'}`} />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-in slide-in-from-top-2 duration-200"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2" role="navigation" aria-label="Мобильная навигация">
              {navigationItems.map((item, index) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size={isTouch ? "lg" : "default"}
                  className={`w-full justify-start transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${isTouch ? 'min-h-[44px] text-base py-3' : ''
                    }`}
                  onClick={() => scrollToSection(item.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className={`transition-all duration-500 ${isScrolled
        ? (isTouch ? 'h-20' : 'h-18')
        : (isTouch ? 'h-20' : 'h-16')
        }`} />
    </>
  );
}