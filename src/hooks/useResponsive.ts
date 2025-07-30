'use client';

import { useState, useEffect } from 'react';
import { 
  breakpoints, 
  getScreenSize, 
  isTouchDevice, 
  isMobileDevice,
  getViewportHeight,
  getOrientation,
  shouldReduceMotion
} from '@/lib/responsive';

export interface ResponsiveState {
  screenSize: keyof typeof breakpoints | 'xs';
  isMobile: boolean;
  isTouch: boolean;
  viewportHeight: number;
  orientation: 'portrait' | 'landscape';
  reduceMotion: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    screenSize: 'lg',
    isMobile: false,
    isTouch: false,
    viewportHeight: 0,
    orientation: 'portrait',
    reduceMotion: false,
    isSmallScreen: false,
    isMediumScreen: false,
    isLargeScreen: false,
  });

  useEffect(() => {
    const updateState = () => {
      const screenSize = getScreenSize();
      const mobile = isMobileDevice();
      const touch = isTouchDevice();
      const viewportHeight = getViewportHeight();
      const orientation = getOrientation();
      const reduceMotion = shouldReduceMotion();

      setState({
        screenSize,
        isMobile: mobile,
        isTouch: touch,
        viewportHeight,
        orientation,
        reduceMotion,
        isSmallScreen: screenSize === 'xs' || screenSize === 'sm',
        isMediumScreen: screenSize === 'md' || screenSize === 'lg',
        isLargeScreen: screenSize === 'xl' || screenSize === '2xl',
      });
    };

    // Initial update
    updateState();

    // Listen for resize events
    const handleResize = () => {
      updateState();
    };

    // Listen for orientation changes
    const handleOrientationChange = () => {
      // Delay to allow for viewport changes
      setTimeout(updateState, 100);
    };

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      updateState();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return state;
};

// Hook for responsive values
export const useResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T | undefined => {
  const { screenSize } = useResponsive();
  
  // Return the value for current screen size or fallback to smaller sizes
  return (
    values[screenSize] ||
    (screenSize === '2xl' && values.xl) ||
    ((['2xl', 'xl'].includes(screenSize)) && values.lg) ||
    ((['2xl', 'xl', 'lg'].includes(screenSize)) && values.md) ||
    ((['2xl', 'xl', 'lg', 'md'].includes(screenSize)) && values.sm) ||
    values.xs
  );
};

// Hook for touch-friendly sizing
export const useTouchFriendly = () => {
  const { isTouch } = useResponsive();
  
  return {
    isTouch,
    buttonSize: isTouch ? 'lg' : 'default',
    spacing: isTouch ? 'lg' : 'md',
    fontSize: isTouch ? 'base' : 'sm',
  };
};

// Hook for responsive grid columns
export const useResponsiveGrid = (config: {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}) => {
  const columns = useResponsiveValue(config);
  
  return {
    columns: columns || 1,
    gridClass: `grid-cols-${columns || 1}`,
  };
};