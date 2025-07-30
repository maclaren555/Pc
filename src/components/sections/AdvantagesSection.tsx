"use client";

import { AdvantageCard } from "@/components/ui/AdvantageCard";
import { useResponsive } from "@/hooks/useResponsive";

export function AdvantagesSection() {
  const { isSmallScreen } = useResponsive();
  
  return (
    <section className={`${isSmallScreen ? 'py-12' : 'py-16'} px-4 bg-background`}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className={`text-center ${isSmallScreen ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${
            isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
          } font-bold mb-4 text-foreground`}>
            Почему выбирают нас
          </h2>
          <p className={`text-foreground/70 ${
            isSmallScreen ? 'text-base' : 'text-lg'
          } max-w-2xl mx-auto leading-relaxed`}>
            Мы предоставляем качественные игровые ПК с индивидуальным подходом к каждому клиенту
          </p>
        </div>

        {/* Advantages Grid */}
        <div className={`grid grid-cols-1 ${
          isSmallScreen 
            ? 'gap-6' 
            : 'md:grid-cols-2 lg:grid-cols-3 gap-8'
        }`}>
          {/* Advantage Card 1 - Мы всегда на связи */}
          <AdvantageCard
            icon={
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            }
            title="Мы всегда на связи"
            description="Быстро отвечаем на все вопросы"
            content="Поддержка 24/7 для всех клиентов. Отвечаем в течение 15 минут в рабочее время."
          />

          {/* Advantage Card 2 - Подберем любой Компьютер под любые задачи */}
          <AdvantageCard
            icon={
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            title="Подберем любой Компьютер под любые задачи"
            description="Индивидуальный подход к каждому клиенту"
            content="Учитываем ваш бюджет и требования. От офисных задач до топовых игр."
          />

          {/* Advantage Card 3 - Отдадим только чистый и проверенный компьютер */}
          <AdvantageCard
            icon={
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Отдадим только чистый и проверенный компьютер"
            description="Гарантия качества на все компоненты"
            content="Каждый компонент проходит тщательную проверку. Предоставляем гарантию."
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}