"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialData {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] bg-card/60 border-border/40 backdrop-blur-md hover:bg-card/80 hover:border-border/60 transition-all duration-300 group shadow-lg hover:shadow-xl">
      <CardContent className="p-4 md:p-6 relative">
        {/* Quote icon */}
        <Quote className="absolute top-3 right-3 md:top-4 md:right-4 w-4 h-4 md:w-5 md:h-5 text-primary/40 group-hover:text-primary/60 transition-colors" />

        <div className="space-y-3 md:space-y-4">
          {/* Header with avatar and name */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs md:text-sm border-2 border-primary/30 shadow-md">
              {testimonial.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground text-xs md:text-sm">{testimonial.name}</h4>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 ${i < testimonial.rating
                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                      : 'text-muted-foreground/30'
                      }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1 md:ml-2 font-medium">
                  {testimonial.rating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial text */}
          <blockquote className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium italic border-l-2 border-primary/30 pl-2 md:pl-3">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
}