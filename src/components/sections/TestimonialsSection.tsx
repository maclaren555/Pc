"use client";

import { ScrollingTestimonials } from "@/components/ui/ScrollingTestimonials";

const testimonials1 = [
  {
    id: "1",
    name: "Алексей Морозов",
    avatar: "АМ",
    rating: 5,
    text: "Купил ПК для работы с 3D-графикой в Blender и Maya. RTX 3070 + i7-10700K справляются с любыми задачами. Продавец честно рассказал о состоянии каждой детали, показал стресс-тесты. Работает как новое уже 8 месяцев, температуры в норме."
  },
  {
    id: "2", 
    name: "Дмитрий Козлов",
    avatar: "ДК",
    rating: 5,
    text: "Искал бюджетный игровой ПК для CS2 и Dota 2. За 45к получил GTX 1660 Super + Ryzen 5 3600. Играю на высоких настройках 144 FPS стабильно. Даже Cyberpunk 2077 идет на средних! Очень доволен покупкой."
  },
  {
    id: "3",
    name: "Игорь Смирнов",
    avatar: "ИС", 
    rating: 5,
    text: "Заказывал ПК для сына-школьника. Нужен был для учебы и легких игр типа Minecraft, Roblox. Подобрали GTX 1050 Ti + i5, за 25к отличная конфигурация. Сын в восторге от Minecraft с шейдерами BSL!"
  },
  {
    id: "4",
    name: "Максим Волков",
    avatar: "МВ",
    rating: 5,
    text: "Профессиональный подход к делу. Объяснили каждую деталь, показали тесты FurMark и Cinebench. ПК работает тихо даже под нагрузкой - кулеры Noctua творят чудеса. Рекомендую всем знакомым!"
  },
  {
    id: "5",
    name: "Андрей Лебедев",
    avatar: "АЛ",
    rating: 5,
    text: "Собрали мощный ПК для стриминга на Twitch. i7-10700K + RTX 3060 Ti тянут любые игры + OBS в 1080p60 без просадок FPS. Доставили точно в срок, упаковка в 3 слоя пупырки."
  }
];

const testimonials2 = [
  {
    id: "6",
    name: "Сергей Романов",
    avatar: "СР",
    rating: 5,
    text: "Покупал ПК для Cyberpunk 2077 и новых AAA игр. RTX 4060 Ti + i5-12400F выдают стабильные 70+ FPS на ультрах в 1440p. Даже Starfield и Alan Wake 2 летают! Очень доволен производительностью."
  },
  {
    id: "7",
    name: "Владимир Николаев",
    avatar: "ВН", 
    rating: 5,
    text: "Нужен был ПК для программирования на Python и React. Посоветовали Ryzen 5 + 16GB DDR4 + NVMe SSD. Компиляция Docker контейнеров теперь в разы быстрее. VS Code летает!"
  },
  {
    id: "8",
    name: "Роман Титов",
    avatar: "РТ",
    rating: 5,
    text: "Заказывал ПК для монтажа видео в 4K для YouTube канала. Ryzen 7 5700X + 32GB RAM справляются с DaVinci Resolve и After Effects без тормозов. Рендер 10-минутного ролика стал занимать 15 минут вместо часа!"
  },
  {
    id: "9",
    name: "Павел Жуков",
    avatar: "ПЖ",
    rating: 5,
    text: "Переезжал из Москвы в Питер, нужен был надежный ПК. Упаковали идеально - антистатик, пупырка, пенопласт. Довезли курьером, ни одной царапины. Все компоненты работают как часы."
  },
  {
    id: "10",
    name: "Николай Белов",
    avatar: "НБ",
    rating: 5,
    text: "После покупки возникли вопросы по настройке XMP профилей в BIOS для разгона RAM. Ребята терпеливо все объяснили по телефону, даже TeamViewer подключили. Отличная поддержка!"
  }
];

const testimonials3 = [
  {
    id: "11",
    name: "Евгений Крылов",
    avatar: "ЕК",
    rating: 5,
    text: "Купил ПК для майнинга Ethereum год назад (до перехода на PoS). 6x RTX 3060 Ti работали 24/7 без единого сбоя. Качественные райзеры, профессиональная сборка. Окупился за 8 месяцев!"
  },
  {
    id: "12",
    name: "Артем Данилов",
    avatar: "АД",
    rating: 5,
    text: "Заказывал ПК из Екатеринбурга в Новосибирск. Доставка СДЭК прошла идеально - все в антистатике, пупырчатой пленке и пенопласте. ПК работает как заявлено, никаких проблем."
  },
  {
    id: "13",
    name: "Михаил Петров",
    avatar: "МП",
    rating: 5,
    text: "Стримлю на Twitch канал 'MikhailGames', нужен был мощный ПК. i7-11700K + RTX 3070 тянут любые игры + OBS в 1080p60 без просадок FPS. 2000+ зрителей довольны качеством!"
  },
  {
    id: "14",
    name: "Олег Васильев",
    avatar: "ОВ",
    rating: 5,
    text: "Сравнивал цены в DNS, Ситилинк, Регард и еще 2 магазинах - здесь оказалось дешевле на 15%. При этом дали гарантию 6 месяцев и помогли с настройкой Windows. Честный бизнес!"
  },
  {
    id: "15",
    name: "Денис Морозов",
    avatar: "ДМ",
    rating: 5,
    text: "Хотел покупать комплектующие по отдельности на Авито, но ребята предложили готовую сборку дешевле на 8к. Все совместимо, BIOS настроен, Windows активирован. Никаких конфликтов железа."
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Более 500 довольных клиентов уже получили свои идеальные игровые ПК
          </p>
        </div>

        {/* Scrolling Rows Container */}
        <div className="relative">
          {/* Gradient masks for smooth edges - only on desktop */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Mobile: Single Row, Desktop: Three Rows */}
          <div className="space-y-6">
            {/* Mobile: Single combined row */}
            <div className="block md:hidden">
              <ScrollingTestimonials 
                testimonials={[...testimonials1, ...testimonials2, ...testimonials3]} 
                direction="left" 
                speed={45}
              />
            </div>
            
            {/* Desktop: Three separate rows */}
            <div className="hidden md:block space-y-6">
              {/* First Row - Moving Left */}
              <ScrollingTestimonials 
                testimonials={testimonials1} 
                direction="left" 
                speed={30}
              />
              
              {/* Second Row - Moving Right (slower) */}
              <ScrollingTestimonials 
                testimonials={testimonials2} 
                direction="right" 
                speed={20}
              />
              
              {/* Third Row - Moving Left (fastest) */}
              <ScrollingTestimonials 
                testimonials={testimonials3} 
                direction="left" 
                speed={40}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}