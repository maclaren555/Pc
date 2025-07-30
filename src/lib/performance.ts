'use client';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: Map<string, PerformanceObserver> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime: number;
        loadTime: number;
      };
      
      const lcp = lastEntry.renderTime || lastEntry.loadTime;
      console.log('LCP:', lcp);
      
      // Report to analytics if needed
      this.reportMetric('LCP', lcp);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch {
      console.warn('LCP observer not supported');
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & {
          processingStart: number;
          startTime: number;
        };
        const fid = fidEntry.processingStart - fidEntry.startTime;
        console.log('FID:', fid);
        this.reportMetric('FID', fid);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch {
      console.warn('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const clsEntry = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      });
      console.log('CLS:', clsValue);
      this.reportMetric('CLS', clsValue);
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch {
      console.warn('CLS observer not supported');
    }
  }

  // Monitor long tasks
  observeLongTasks() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.warn('Long task detected:', entry.duration, 'ms');
        this.reportMetric('LONG_TASK', entry.duration);
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', longTaskObserver);
    } catch {
      console.warn('Long task observer not supported');
    }
  }

  // Monitor resource loading
  observeResources() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceEntry & {
          name: string;
          duration: number;
        };
        if (resourceEntry.duration > 1000) { // Resources taking more than 1s
          console.warn('Slow resource:', resourceEntry.name, resourceEntry.duration, 'ms');
          this.reportMetric('SLOW_RESOURCE', resourceEntry.duration, { resource: resourceEntry.name });
        }
      });
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
    } catch {
      console.warn('Resource observer not supported');
    }
  }

  private reportMetric(name: string, value: number, metadata?: Record<string, unknown>) {
    // In a real app, you'd send this to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metric - ${name}:`, value, metadata);
    }
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

// Utility to measure component render time
export function measureRenderTime<T extends unknown[]>(
  componentName: string,
  fn: (...args: T) => unknown
) {
  return (...args: T) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (end - start > 16) { // More than one frame (16ms)
      console.warn(`Slow render - ${componentName}:`, end - start, 'ms');
    }
    
    return result;
  };
}

// Debounce utility for performance
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
): (...args: T) => void {
  let inThrottle: boolean;
  
  return (...args: T) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}