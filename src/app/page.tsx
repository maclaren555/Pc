import { Navigation } from "@/components/ui/Navigation";
import { SectionNavigator } from "@/components/ui/SectionNavigator";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HeroSection } from "@/components/sections/HeroSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ExamplesSection } from "@/components/sections/ExamplesSection";
import { PCBuilderSection } from "@/components/sections/PCBuilderSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100]">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Перейти к основному содержимому
        </a>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Section Navigator */}
      <SectionNavigator />

      {/* Main Content */}
      <main id="main-content" className="relative" role="main">
        {/* Hero Section - Full viewport height for impact */}
        <section 
          id="hero" 
          className="scroll-mt-20 min-h-screen relative" 
          aria-labelledby="hero-heading"
          style={{
            // iOS Safari viewport height fix
            minHeight: '-webkit-fill-available',
          }}
        >
          <HeroSection />
          {/* Gradient transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </section>

        {/* Content Sections with enhanced spacing and transitions */}
        <div className="relative z-10">
          {/* Advantages Section */}
          <AnimatedSection
            id="advantages"
            className="scroll-mt-20 py-8 md:py-12 lg:py-18 relative"
            delay={100}
            animationType="fade-up"
          >
            <AdvantagesSection />
            {/* Section separator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </AnimatedSection>

          {/* Examples Section */}
          <AnimatedSection
            id="examples"
            className="scroll-mt-20 py-8 md:py-12 lg:py-18 bg-card/20 relative"
            delay={150}
            animationType="slide-left"
          >
            <ExamplesSection />
            {/* Section separator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </AnimatedSection>

          {/* PC Builder Section - Compact spacing with emphasis */}
          <AnimatedSection
            id="builder"
            className="scroll-mt-20 py-8 md:py-10 lg:py-14 relative bg-primary/5"
            delay={100}
            animationType="fade-in"
          >
            <PCBuilderSection />
            {/* Section separator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </AnimatedSection>

          {/* Testimonials Section */}
          <AnimatedSection
            id="testimonials"
            className="scroll-mt-20 py-8 md:py-12 lg:py-18 bg-card/10 relative"
            delay={200}
            animationType="slide-right"
          >
            <TestimonialsSection />
            {/* Section separator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </AnimatedSection>

          {/* FAQ Section */}
          <AnimatedSection
            id="faq"
            className="scroll-mt-20 py-8 md:py-12 lg:py-18 relative"
            delay={100}
            animationType="fade-up"
          >
            <FAQSection />
            {/* Section separator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </AnimatedSection>

          {/* Contact Form Section */}
          <AnimatedSection
            id="contact"
            className="scroll-mt-20 py-8 md:py-12 lg:py-18 bg-card/20 relative"
            delay={150}
            animationType="fade-up"
          >
            <ContactFormSection />
          </AnimatedSection>
        </div>

        {/* Enhanced Footer */}
        <footer className="relative z-10 border-t border-border bg-card/50 py-12 mt-20" role="contentinfo">
          <div className="container mx-auto px-4">
            {/* Main footer content */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                  <span className="text-white font-bold">PC</span>
                </div>
                <span className="font-bold text-xl">Gaming PC</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                Занимаемся продажей игровых ПК на Авито из Б/У запчастей.
                Подберем компьютер под любые задачи и бюджет.
              </p>
              <ul className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground" role="list" aria-label="Наши преимущества">
                <li className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                  Всегда на связи
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                  Подберем любой компьютер
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                  Только чистые и проверенные ПК
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div className="border-t border-border pt-6 text-center">
              <p className="text-muted-foreground text-xs">
                © 2024 Gaming PC. Все права защищены.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
