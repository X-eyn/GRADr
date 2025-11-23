"use client";
import React, { useId, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  className?: string;
  children?: React.ReactNode;
}

export const SparklesCore: React.FC<SparklesProps> = ({
  id,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#FFF",
  particleDensity = 100,
  className,
}) => {
  const generatedId = useId();
  const effectId = id || generatedId;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <filter id={`blur-${effectId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        {[...Array(particleDensity)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * (maxSize - minSize) + minSize}
            fill={particleColor}
            filter={`url(#blur-${effectId})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: Math.random() * speed + speed / 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export const Sparkles: React.FC<
  SparklesProps & { children: React.ReactNode }
> = ({
  children,
  className,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#FFF",
  particleDensity = 50,
  ...props
}) => {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background={background}
          minSize={minSize}
          maxSize={maxSize}
          speed={speed}
          particleColor={particleColor}
          particleDensity={particleDensity}
        />
      </div>
    </div>
  );
};

