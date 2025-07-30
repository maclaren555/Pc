"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Monitor, Zap } from "lucide-react";
import { useState } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function PCBuilderSection() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToContact = () => {
    smoothScrollTo('contact');
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="relative overflow-hidden bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              {/* Icons */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Не знаете какой ПК выбрать?
              </h2>
              
              {/* Description */}
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Мы поможем подобрать идеальную конфигурацию под ваши задачи и бюджет. 
                Получите персональную консультацию от наших экспертов.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  variant="gaming"
                  size="lg"
                  onClick={scrollToContact}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Подобрать ПК бесплатно
                    <ArrowRight 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1' : ''
                      }`} 
                    />
                  </span>
                  
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Бесплатная консультация</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Подбор под бюджет</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Гарантия качества</span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl" />
        </Card>
      </div>
    </section>
  );
}