/**
 * Responsive utilities for cross-browser compatibility and mobile optimization
 */

import React from 'react';

// Breakpoint definitions matching Tailwind CSS
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Touch device detection
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - for older browsers
    navigator.msMaxTouchPoints > 0
  );
};

// Mobile device detection
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Screen size utilities
export const getScreenSize = (): keyof typeof breakpoints | 'xs' => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

// Viewport height fix for mobile browsers
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // Use visualViewport if available (modern browsers)
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  
  // Fallback to window.innerHeight
  return window.innerHeight;
};

// Safe area insets for devices with notches
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
  };
};

// Responsive font size calculator
export const getResponsiveFontSize = (
  baseSize: number,
  screenSize: keyof typeof breakpoints | 'xs'
): number => {
  const scalingFactors = {
    xs: 0.8,
    sm: 0.9,
    md: 1,
    lg: 1.1,
    xl: 1.2,
    '2xl': 1.3,
  };
  
  return baseSize * scalingFactors[screenSize];
};

// Touch-friendly sizing
export const getTouchFriendlySize = (baseSize: number): number => {
  if (!isTouchDevice()) return baseSize;
  
  // Minimum 44px for touch targets (Apple HIG recommendation)
  const minTouchSize = 44;
  return Math.max(baseSize, minTouchSize);
};

// Browser support detection
export const getBrowserSupport = () => {
  if (typeof window === 'undefined') {
    return {
      supportsGrid: false,
      supportsFlexbox: false,
      supportsBackdropFilter: false,
      supportsIntersectionObserver: false,
      supportsResizeObserver: false,
    };
  }
  
  // Test element for feature detection (if needed in future)
  // const testElement = document.createElement('div');
  
  return {
    supportsGrid: CSS.supports('display', 'grid'),
    supportsFlexbox: CSS.supports('display', 'flex'),
    supportsBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
    supportsIntersectionObserver: 'IntersectionObserver' in window,
    supportsResizeObserver: 'ResizeObserver' in window,
  };
};

// Responsive image sizing
export const getResponsiveImageSizes = (
  screenSize: keyof typeof breakpoints | 'xs'
): string => {
  const sizeMappings = {
    xs: '100vw',
    sm: '100vw',
    md: '50vw',
    lg: '33vw',
    xl: '25vw',
    '2xl': '20vw',
  };
  
  return sizeMappings[screenSize];
};

// Performance optimization for animations
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Orientation change handling
export const getOrientation = (): 'portrait' | 'landscape' => {
  if (typeof window === 'undefined') return 'portrait';
  
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

// Container query polyfill helper
export const useContainerQuery = (containerRef: React.RefObject<HTMLElement>) => {
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    
    // Use ResizeObserver if available
    if (getBrowserSupport().supportsResizeObserver) {
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(containerRef.current);
      
      return () => resizeObserver.disconnect();
    } else {
      // Fallback to window resize
      window.addEventListener('resize', updateSize);
      updateSize();
      
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [containerRef]);
  
  return containerSize;
};