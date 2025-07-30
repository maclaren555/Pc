'use client';

import { useEffect } from 'react';
import { PerformanceMonitor } from '@/lib/performance';
import { AccessibilityAuditor } from '@/lib/accessibility';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const monitor = PerformanceMonitor.getInstance();
      
      // Start monitoring
      monitor.observeWebVitals();
      monitor.observeLongTasks();
      monitor.observeResources();
      
      // Run accessibility audit after page loads
      const timer = setTimeout(() => {
        AccessibilityAuditor.auditPage();
      }, 2000);
      
      // Cleanup on unmount
      return () => {
        monitor.disconnect();
        clearTimeout(timer);
      };
    }
  }, []);

  return <>{children}</>;
}