'use client';

import { useState, useCallback, memo } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Какие гарантии вы предоставляете на собранные ПК?',
    answer: 'Мы предоставляем гарантию на все собранные нами ПК сроком от 6 месяцев до 1 года в зависимости от комплектующих. На каждую деталь действует индивидуальная гарантия, а также мы обеспечиваем техническую поддержку и помощь в настройке.',
    category: 'warranty'
  },
  {
    id: '2',
    question: 'Можно ли посмотреть компьютер перед покупкой?',
    answer: 'Конечно! Мы всегда приглашаем клиентов посмотреть на готовый компьютер перед покупкой. Вы можете протестировать его работу, проверить все функции и убедиться в качестве сборки. Встреча происходит в удобном для вас месте.',
    category: 'viewing'
  },
  {
    id: '3',
    question: 'Сколько времени занимает подбор и сборка ПК?',
    answer: 'Подбор комплектующих обычно занимает 1-2 дня, в зависимости от ваших требований и бюджета. Сборка и тестирование готового ПК занимает еще 2-3 дня. В среднем, от заявки до готового компьютера проходит 3-5 дней.',
    category: 'timing'
  },
  {
    id: '4',
    question: 'Какой бюджет нужен для игрового ПК?',
    answer: 'Бюджет зависит от ваших задач. Для комфортной игры в современные игры на средних настройках достаточно 40-60 тысяч рублей. Для игр на высоких настройках - 60-100 тысяч. Для максимальных настроек и 4K - от 100 тысяч рублей.',
    category: 'budget'
  },
  {
    id: '5',
    question: 'Проверяете ли вы комплектующие перед сборкой?',
    answer: 'Да, мы тщательно проверяем каждую деталь перед установкой. Все комплектующие проходят диагностику, стресс-тесты и проверку на совместимость. Мы не используем детали с дефектами или признаками скорого выхода из строя.',
    category: 'quality'
  },
  {
    id: '6',
    question: 'Можно ли заказать апгрейд существующего ПК?',
    answer: 'Конечно! Мы можем модернизировать ваш текущий компьютер, заменив устаревшие комплектующие на более производительные. Проведем диагностику, определим узкие места и предложим оптимальные варианты апгрейда в рамках вашего бюджета.',
    category: 'upgrade'
  },
  {
    id: '7',
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату наличными при встрече, переводом на карту, через СБП или банковским переводом. Возможна частичная предоплата (30-50%) для начала подбора комплектующих, остальная сумма - при получении готового ПК.',
    category: 'payment'
  },
  {
    id: '8',
    question: 'Устанавливаете ли вы операционную систему и программы?',
    answer: 'Да, мы устанавливаем Windows, все необходимые драйверы, базовые программы и можем настроить систему под ваши нужды. Также можем установить игры и специализированное ПО по вашему списку.',
    category: 'software'
  }
];

// Мемоизированный компонент FAQ элемента для предотвращения лишних ререндеров
const FAQItem = memo(({ 
  item, 
  isOpen, 
  onToggle,
  onKeyDown
}: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
  onKeyDown: (event: React.KeyboardEvent, itemId: string) => void;
}) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden transition-colors duration-200">
      <button
        onClick={onToggle}
        onKeyDown={(e) => onKeyDown(e, item.id)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200 focus:outline-none"
       
        aria-controls={`faq-answer-${item.id}`}
        aria-describedby={`faq-question-${item.id}`}
      >
        <span id={`faq-question-${item.id}`} className="text-foreground font-medium text-lg pr-4">
          {item.question}
        </span>
        <div className={`flex-shrink-0 text-primary transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true">
          <ChevronDown size={24} />
        </div>
      </button>
      
      <div
        id={`faq-answer-${item.id}`}
        className="overflow-hidden"
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
        }}
      >
        <div 
          className="px-6 pb-5 pt-2"
          style={{
            transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          <div className="h-px bg-border mb-4"></div>
          <p className="text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Мемоизированная функция для предотвращения создания новых функций при каждом рендере
  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Keyboard navigation for FAQ items
  const handleKeyDown = useCallback((event: React.KeyboardEvent, itemId: string) => {
    const currentIndex = faqData.findIndex(item => item.id === itemId);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % faqData.length;
        const nextButton = document.querySelector(`button[aria-controls="faq-answer-${faqData[nextIndex].id}"]`) as HTMLButtonElement;
        nextButton?.focus();
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? faqData.length - 1 : currentIndex - 1;
        const prevButton = document.querySelector(`button[aria-controls="faq-answer-${faqData[prevIndex].id}"]`) as HTMLButtonElement;
        prevButton?.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        const firstButton = document.querySelector(`button[aria-controls="faq-answer-${faqData[0].id}"]`) as HTMLButtonElement;
        firstButton?.focus();
        break;
        
      case 'End':
        event.preventDefault();
        const lastButton = document.querySelector(`button[aria-controls="faq-answer-${faqData[faqData.length - 1].id}"]`) as HTMLButtonElement;
        lastButton?.focus();
        break;
    }
  }, []);

  return (
    <section className="py-20 px-4 bg-background will-change-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Часто задаваемые вопросы
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о наших услугах и процессе сборки игровых ПК
          </p>
        </div>

        <div className="space-y-4" role="list" aria-label="Список часто задаваемых вопросов">
          {faqData.map((item) => (
            <div key={item.id} role="listitem">
              <FAQItem
                item={item}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                onKeyDown={handleKeyDown}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            onClick={() => {
              // Плавная прокрутка к форме контактов
              const contactForm = document.getElementById('contact');
              if (contactForm) {
                const rect = contactForm.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const elementTop = rect.top + scrollTop;
                const offset = 120;
                
                window.scrollTo({
                  top: Math.max(0, elementTop - offset),
                  behavior: 'smooth'
                });
              }
            }}
            aria-label="Перейти к форме обратной связи для задания вопроса"
          >
            Задать вопрос
          </button>
        </div>
      </div>
    </section>
  );
}