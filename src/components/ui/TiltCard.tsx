"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  enableSpotlight?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glowColor = "rgba(0, 210, 255, 0.25)",
  enableSpotlight = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setMousePos({ x: mouseX, y: mouseY });

    // Normalized between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative rounded-2xl border border-[#182343] bg-[#090e24]/85 backdrop-blur-xl transition-shadow duration-300",
          isHovered && "shadow-2xl shadow-[#0000F2]/20 border-[#00D2FF]/40",
          className
        )}
        {...(props as any)}
      >
        {/* Spotlight cursor reflection */}
        {enableSpotlight && isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
            }}
          />
        )}

        {/* Content with 3D child preservation */}
        <div className="relative z-10 w-full" style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
