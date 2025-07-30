"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AdvantageCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  content: string;
  className?: string;
}

export function AdvantageCard({
  icon,
  title,
  description,
  content,
  className = ""
}: AdvantageCardProps) {
  return (
    <Card className={`group hover:shadow-lg hover:shadow-purple-500/25 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 border-gray-900/50 bg-card/80 backdrop-blur-sm ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-foreground/60 text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-0">
        <p className="text-foreground/80 leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}