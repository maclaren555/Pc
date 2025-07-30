export function smoothScrollTo(elementId: string, offset: number = 120) {
  const element = document.getElementById(elementId);
  if (element) {
    // Get the element's position relative to the document
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    
    // Calculate final scroll position
    const finalPosition = Math.max(0, elementTop - offset);
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
    });
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export function addSmoothScrollToLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        const elementId = href.substring(1);
        smoothScrollTo(elementId);
      }
    });
  });
}

export function getCurrentSection(): string {
  const sections = [
    'hero', 'advantages', 'examples', 'builder', 
    'testimonials', 'faq', 'contact'
  ];
  
  // Use a smaller offset to be more precise
  const scrollPosition = window.scrollY + 200;
  
  // Find the section that the user is currently viewing
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Check if we're in this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return sections[i];
      }
      
      // Special case for the last section
      if (i === sections.length - 1 && scrollPosition >= sectionTop) {
        return sections[i];
      }
    }
  }
  
  return 'hero';
}

export function getNextSection(currentSection: string): string | null {
  const sections = [
    'hero', 'advantages', 'examples', 'builder', 
    'testimonials', 'faq', 'contact'
  ];
  
  const currentIndex = sections.indexOf(currentSection);
  if (currentIndex >= 0 && currentIndex < sections.length - 1) {
    return sections[currentIndex + 1];
  }
  
  return null;
}

export function getPreviousSection(currentSection: string): string | null {
  const sections = [
    'hero', 'advantages', 'examples', 'builder', 
    'testimonials', 'faq', 'contact'
  ];
  
  const currentIndex = sections.indexOf(currentSection);
  if (currentIndex > 0) {
    return sections[currentIndex - 1];
  }
  
  return null;
}