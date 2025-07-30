"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/LazyImage";
import { smoothScrollTo } from "@/lib/smooth-scroll";

import { useState } from "react";

interface PCExample {
  id: string;
  title: string;
  description: string;
  images: string[];
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    price: number;
  };
  category: 'gaming' | 'workstation' | 'budget';
}

// Mock data for PC examples
const pcExamples: PCExample[] = [
  {
    id: "1",
    title: "Игровой ПК для киберспорта",
    description: "Высокопроизводительная система для соревновательных игр",
    images: ["/placeholder-pc-1.jpg"],
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 3060 Ti",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      price: 85000
    },
    category: "gaming"
  },
  {
    id: "2",
    title: "Бюджетный игровой ПК",
    description: "Отличное соотношение цена-качество для популярных игр",
    images: ["/placeholder-pc-2.jpg"],
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "GTX 1660 Super",
      ram: "16GB DDR4",
      storage: "256GB SSD + 1TB HDD",
      price: 55000
    },
    category: "budget"
  },
  {
    id: "3",
    title: "Рабочая станция для стримеров",
    description: "Мощная система для стриминга и контент-создания",
    images: ["/placeholder-pc-3.jpg"],
    specs: {
      cpu: "AMD Ryzen 7 5800X",
      gpu: "RTX 3070",
      ram: "32GB DDR4",
      storage: "1TB NVMe SSD",
      price: 120000
    },
    category: "workstation"
  },
  {
    id: "4",
    title: "Топовый игровой ПК",
    description: "Максимальная производительность для 4K гейминга",
    images: ["/placeholder-pc-4.jpg"],
    specs: {
      cpu: "Intel Core i7-12700K",
      gpu: "RTX 3080",
      ram: "32GB DDR4",
      storage: "1TB NVMe SSD",
      price: 180000
    },
    category: "gaming"
  },
  {
    id: "5",
    title: "Компактный игровой ПК",
    description: "Мощная система в компактном корпусе",
    images: ["/placeholder-pc-5.jpg"],
    specs: {
      cpu: "AMD Ryzen 5 5600G",
      gpu: "RTX 3060",
      ram: "16GB DDR4",
      storage: "500GB NVMe SSD",
      price: 70000
    },
    category: "gaming"
  },
  {
    id: "6",
    title: "Офисная рабочая станция",
    description: "Надежная система для профессиональных задач",
    images: ["/placeholder-pc-6.jpg"],
    specs: {
      cpu: "Intel Core i5-12400",
      gpu: "Встроенная графика",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      price: 45000
    },
    category: "workstation"
  }
];

export function ExamplesSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gaming' | 'workstation' | 'budget'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredExamples = selectedCategory === 'all'
    ? pcExamples
    : pcExamples.filter(pc => pc.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Примеры наших работ
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Посмотрите на ПК, которые мы уже собрали и передали довольным клиентам
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'gaming' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Все ПК
          </Button>
          <Button
            variant={selectedCategory === 'gaming' ? 'gaming' : 'outline'}
            onClick={() => setSelectedCategory('gaming')}
            className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Игровые
          </Button>
          <Button
            variant={selectedCategory === 'workstation' ? 'gaming' : 'outline'}
            onClick={() => setSelectedCategory('workstation')}
            className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Рабочие станции
          </Button>
          <Button
            variant={selectedCategory === 'budget' ? 'gaming' : 'outline'}
            onClick={() => setSelectedCategory('budget')}
            className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Бюджетные
          </Button>
        </div>

        {/* PC Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((pc) => (
            <Card
              key={pc.id}
              className="group pc-card-hover hover:-translate-y-3 bg-card/80 backdrop-blur-sm overflow-hidden"
            >
              {/* PC Image */}
              <div className="relative h-48 overflow-hidden bg-card/30">
                <LazyImage
                  src={pc.images[0]}
                  alt={pc.title}
                  className="absolute inset-0 cursor-pointer hover:scale-105 transition-transform duration-300"
                  placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
                  onError={() => {
                    // Fallback to placeholder content
                  }}
                />

                {/* Fallback content for missing images */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setLightboxImage(pc.images[0])}
                >
                  <div className="text-center text-foreground/60">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">Нажмите для просмотра</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => setLightboxImage(pc.images[0])}
                  >
                    Увеличить
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                      {pc.title}
                    </CardTitle>
                    <CardDescription className="text-foreground/60 text-sm">
                      {pc.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(pc.specs.price)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Specifications */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-foreground/70 text-sm">Процессор:</span>
                    <span className="text-foreground font-medium text-sm font-mono">
                      {pc.specs.cpu}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-foreground/70 text-sm">Видеокарта:</span>
                    <span className="text-foreground font-medium text-sm font-mono">
                      {pc.specs.gpu}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-foreground/70 text-sm">Память:</span>
                    <span className="text-foreground font-medium text-sm font-mono">
                      {pc.specs.ram}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-foreground/70 text-sm">Накопитель:</span>
                    <span className="text-foreground font-medium text-sm font-mono">
                      {pc.specs.storage}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Button
                    variant="gaming"
                    className="w-full group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
                    onClick={() => smoothScrollTo('contact')}
                  >
                    Собрать похожий
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>

      {/* Simple Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="bg-gradient-to-br from-primary/30 to-secondary/30 p-8 rounded-lg">
              <div className="text-center text-foreground/60">
                <svg
                  className="w-32 h-32 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg font-medium mb-2">Изображение ПК</p>
                <p className="text-sm text-foreground/50">
                  Здесь будет отображаться фотография собранного компьютера
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-4 -right-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setLightboxImage(null)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}