/**
 * Integration tests for responsive design and cross-browser compatibility
 */

export interface ResponsiveTestResult {
  testName: string;
  passed: boolean;
  details: string;
  recommendations?: string[];
}

export class ResponsiveIntegrationTest {
  private results: ResponsiveTestResult[] = [];

  // Test viewport meta tag
  testViewportMeta(): ResponsiveTestResult {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const content = viewportMeta?.getAttribute('content') || '';
    
    const hasDeviceWidth = content.includes('width=device-width');
    const hasInitialScale = content.includes('initial-scale=1');
    // Check for viewport-fit support (useful for devices with notches)
    // const hasViewportFit = content.includes('viewport-fit=cover');
    
    const passed = hasDeviceWidth && hasInitialScale;
    
    return {
      testName: 'Viewport Meta Tag',
      passed,
      details: `Content: ${content}`,
      recommendations: !passed ? [
        'Add width=device-width for proper mobile scaling',
        'Add initial-scale=1 for consistent zoom level',
        'Consider viewport-fit=cover for devices with notches'
      ] : undefined
    };
  }

  // Test touch-friendly button sizes
  testTouchTargets(): ResponsiveTestResult {
    const buttons = document.querySelectorAll('button, [role="button"], a[href]');
    let smallTargets = 0;
    const totalTargets = buttons.length;

    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      const minSize = 44; // Apple HIG recommendation
      
      if (rect.width < minSize || rect.height < minSize) {
        smallTargets++;
      }
    });

    const passed = smallTargets === 0;
    
    return {
      testName: 'Touch Target Sizes',
      passed,
      details: `${smallTargets}/${totalTargets} targets are smaller than 44px`,
      recommendations: !passed ? [
        'Increase button sizes to minimum 44x44px for touch devices',
        'Add padding to small interactive elements',
        'Use min-height and min-width CSS properties'
      ] : undefined
    };
  }

  // Test responsive breakpoints
  testBreakpoints(): ResponsiveTestResult {
    // Standard responsive breakpoints for reference
    // const breakpoints = [640, 768, 1024, 1280, 1536];
    const currentWidth = window.innerWidth;
    
    // Test if layout adapts at different breakpoints
    const container = document.querySelector('.container');
    const hasResponsiveContainer = container !== null;
    
    const gridElements = document.querySelectorAll('[class*="grid-cols"]');
    const hasResponsiveGrids = gridElements.length > 0;
    
    const passed = hasResponsiveContainer && hasResponsiveGrids;
    
    return {
      testName: 'Responsive Breakpoints',
      passed,
      details: `Current width: ${currentWidth}px, Container: ${hasResponsiveContainer}, Grids: ${hasResponsiveGrids}`,
      recommendations: !passed ? [
        'Implement responsive container classes',
        'Use responsive grid systems',
        'Test layout at all major breakpoints'
      ] : undefined
    };
  }

  // Test cross-browser CSS support
  testCSSSupport(): ResponsiveTestResult {
    const features = {
      flexbox: CSS.supports('display', 'flex'),
      grid: CSS.supports('display', 'grid'),
      backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
      customProperties: CSS.supports('color', 'var(--test)'),
      gap: CSS.supports('gap', '1rem')
    };

    const unsupportedFeatures = Object.entries(features)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);

    const passed = unsupportedFeatures.length === 0;
    
    return {
      testName: 'CSS Feature Support',
      passed,
      details: `Unsupported: ${unsupportedFeatures.join(', ') || 'None'}`,
      recommendations: !passed ? [
        'Provide fallbacks for unsupported CSS features',
        'Use progressive enhancement',
        'Test in older browsers'
      ] : undefined
    };
  }

  // Test accessibility features
  testAccessibility(): ResponsiveTestResult {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    let elementsWithoutFocusStyles = 0;
    
    focusableElements.forEach(element => {
      const styles = getComputedStyle(element);
      const hasFocusOutline = styles.outline !== 'none' || 
                             styles.boxShadow.includes('ring') ||
                             element.classList.contains('focus:ring');
      
      if (!hasFocusOutline) {
        elementsWithoutFocusStyles++;
      }
    });

    const passed = elementsWithoutFocusStyles === 0;
    
    return {
      testName: 'Accessibility Focus Styles',
      passed,
      details: `${elementsWithoutFocusStyles}/${focusableElements.length} elements lack focus styles`,
      recommendations: !passed ? [
        'Add focus:ring classes to interactive elements',
        'Ensure sufficient color contrast for focus indicators',
        'Test keyboard navigation'
      ] : undefined
    };
  }

  // Test reduced motion support
  testReducedMotion(): ResponsiveTestResult {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
    
    // Check if animations are disabled when reduced motion is preferred
    let animationsRespectPreference = true;
    
    if (prefersReducedMotion) {
      animatedElements.forEach(element => {
        const styles = getComputedStyle(element);
        if (styles.animationDuration !== '0.01ms' && styles.transitionDuration !== '0.01ms') {
          animationsRespectPreference = false;
        }
      });
    }

    const passed = !prefersReducedMotion || animationsRespectPreference;
    
    return {
      testName: 'Reduced Motion Support',
      passed,
      details: `Prefers reduced motion: ${prefersReducedMotion}, Animations respect preference: ${animationsRespectPreference}`,
      recommendations: !passed ? [
        'Add @media (prefers-reduced-motion: reduce) CSS rules',
        'Disable or reduce animations for users who prefer it',
        'Provide animation toggle controls'
      ] : undefined
    };
  }

  // Test mobile-specific optimizations
  testMobileOptimizations(): ResponsiveTestResult {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      return {
        testName: 'Mobile Optimizations',
        passed: true,
        details: 'Not on mobile device - test skipped'
      };
    }

    // Check for mobile-specific optimizations
    const bodyStyle = document.body.style as CSSStyleDeclaration & { 
      webkitOverflowScrolling?: string;
      overscrollBehavior?: string;
    };
    const htmlStyle = document.documentElement.style as CSSStyleDeclaration & { 
      height?: string;
    };
    
    const hasWebkitOverflowScrolling = bodyStyle.webkitOverflowScrolling === 'touch';
    const hasViewportHeightFix = htmlStyle.height === '-webkit-fill-available';
    const preventsBounceScrolling = bodyStyle.overscrollBehavior === 'none';
    
    const optimizations = [
      hasWebkitOverflowScrolling,
      hasViewportHeightFix,
      preventsBounceScrolling
    ];
    
    const passed = optimizations.filter(Boolean).length >= 2;
    
    return {
      testName: 'Mobile Optimizations',
      passed,
      details: `Webkit scrolling: ${hasWebkitOverflowScrolling}, Viewport fix: ${hasViewportHeightFix}, Bounce prevention: ${preventsBounceScrolling}`,
      recommendations: !passed ? [
        'Add -webkit-overflow-scrolling: touch for smooth scrolling',
        'Use -webkit-fill-available for viewport height on iOS',
        'Prevent bounce scrolling with overscroll-behavior: none'
      ] : undefined
    };
  }

  // Test performance on mobile
  testPerformance(): ResponsiveTestResult {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.fetchStart;
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
    
    // Performance thresholds (in milliseconds)
    const loadTimeThreshold = 3000; // 3 seconds
    const domThreshold = 1500; // 1.5 seconds
    
    const passed = loadTime < loadTimeThreshold && domContentLoaded < domThreshold;
    
    return {
      testName: 'Performance Metrics',
      passed,
      details: `Load time: ${loadTime}ms, DOM ready: ${domContentLoaded}ms`,
      recommendations: !passed ? [
        'Optimize images and assets',
        'Implement code splitting',
        'Use lazy loading for non-critical content',
        'Minimize JavaScript bundle size'
      ] : undefined
    };
  }

  // Run all tests
  async runAllTests(): Promise<ResponsiveTestResult[]> {
    this.results = [];
    
    // Wait for DOM to be ready
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve);
      });
    }

    this.results.push(this.testViewportMeta());
    this.results.push(this.testTouchTargets());
    this.results.push(this.testBreakpoints());
    this.results.push(this.testCSSSupport());
    this.results.push(this.testAccessibility());
    this.results.push(this.testReducedMotion());
    this.results.push(this.testMobileOptimizations());
    this.results.push(this.testPerformance());

    return this.results;
  }

  // Generate report
  generateReport(): string {
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const score = Math.round((passedTests / totalTests) * 100);

    let report = `\n=== Responsive Design Test Report ===\n`;
    report += `Score: ${score}% (${passedTests}/${totalTests} tests passed)\n\n`;

    this.results.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      report += `${status} ${result.testName}\n`;
      report += `   ${result.details}\n`;
      
      if (result.recommendations) {
        report += `   Recommendations:\n`;
        result.recommendations.forEach(rec => {
          report += `   - ${rec}\n`;
        });
      }
      report += '\n';
    });

    return report;
  }
}

// Export test runner function
export const runResponsiveTests = async (): Promise<string> => {
  const tester = new ResponsiveIntegrationTest();
  await tester.runAllTests();
  return tester.generateReport();
};