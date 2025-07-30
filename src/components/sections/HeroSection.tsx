"use client";

import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { TextGenerateEffect } from "@/components/effects/TextGenerateEffect";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { useResponsive } from "@/hooks/useResponsive";

export const HeroSection = () => {
  const { isMobile, isTouch, isSmallScreen, viewportHeight } = useResponsive();
  
  return (
    <section 
      className="relative w-full"
      style={{
        minHeight: isMobile ? `${viewportHeight}px` : '100vh',
      }}
    >
      <AuroraBackground className="dark:bg-slate-950 bg-slate-950">
        <div className={`relative z-50 flex flex-col items-center justify-center text-center ${
          isSmallScreen ? 'px-4' : 'px-6'
        } max-w-6xl mx-auto`}>
          {/* Main heading with TextGenerateEffect */}
          <h1 className={`${
            isSmallScreen 
              ? 'text-2xl sm:text-3xl' 
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
          } font-bold leading-tight mb-6 text-white text-center`}>
            <TextGenerateEffect
              words="Собираем качественные ПК"
              className="block mb-2"
              animateByLetter={true}
              duration={0.8}
              delay={0.08}
            />
            <TextGenerateEffect
              words="из Б/У компонентов"
              className="block"
              animateByLetter={true}
              duration={0.8}
              delay={0.08}
            />
          </h1>

          {/* Subtitle */}
          <p className={`${
            isSmallScreen 
              ? 'text-base sm:text-lg' 
              : 'text-lg sm:text-xl md:text-2xl'
          } text-slate-300 mt-6 mb-8 max-w-3xl leading-relaxed`}>
            Подберем любой компьютер под ваши задачи и бюджет.
            Качественная сборка из проверенных компонентов.
          </p>

          {/* Call-to-action buttons */}
          <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-col sm:flex-row'} justify-center gap-4 mt-4 w-full max-w-md`}>
            <Button
              variant="gaming"
              size={isTouch ? "lg" : "default"}
              className={`${
                isTouch 
                  ? 'text-lg px-8 py-2.5 min-h-[44px]' 
                  : 'text-base px-6 py-2.5'
              } h-auto font-semibold w-full sm:w-auto`}
              onClick={() => smoothScrollTo('contact')}
            >
              Подобрать ПК
            </Button>
            <Button
              variant="outline"
              size={isTouch ? "lg" : "default"}
              className={`${
                isTouch 
                  ? 'text-lg px-8 py-2.5 min-h-[44px]' 
                  : 'text-lg px-8 py-2.5'
              } h-auto font-semibold border-purple-600 text-white hover:border-purple-800 hover:bg-neutral-900 transition-all duration-300 w-full sm:w-auto`}
              onClick={() => smoothScrollTo('examples')}
            >
              Наши работы
            </Button>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
};