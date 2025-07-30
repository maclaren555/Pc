"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  animateByLetter?: boolean;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0.1,
  animateByLetter = false,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        ".animate-element",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          y: 0,
        },
        {
          duration: duration,
          delay: stagger(delay),
          ease: "easeOut",
        }
      );
    }
  }, [isInView, animate, duration, delay, filter]);

  const renderByLetter = () => {
    const letters = words.split("");
    return (
      <motion.div ref={scope} className="inline-block">
        {letters.map((letter, idx) => (
          <motion.span
            key={`letter-${idx}`}
            className={cn(
              "animate-element opacity-0 inline-block",
              filter && "blur-sm"
            )}
            style={{
              filter: filter ? "blur(10px)" : "none",
              transform: "translateY(20px)",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const renderByWord = () => {
    const wordsArray = words.split(" ");
    return (
      <motion.div ref={scope} className="inline-block">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`word-${idx}`}
            className={cn(
              "animate-element opacity-0 inline-block mr-2",
              filter && "blur-sm"
            )}
            style={{
              filter: filter ? "blur(10px)" : "none",
              transform: "translateY(20px)",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="text-white leading-snug tracking-wide">
        {animateByLetter ? renderByLetter() : renderByWord()}
      </div>
    </div>
  );
};