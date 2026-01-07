"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Define Particle class first to satisfy TypeScript
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(isDarkTheme: boolean) {
        if (!ctx) return;
        ctx.fillStyle = isDarkTheme ? "rgba(100, 116, 139, 0.2)" : "rgba(100, 116, 139, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    let animationFrameId: number;
    let w = canvas.width;
    let h = canvas.height;

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((w * h) / 15000), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            const opacity = 0.15 - distance / 1000;
            ctx.strokeStyle = isDark 
              ? `rgba(100, 116, 139, ${opacity})` 
              : `rgba(100, 116, 139, ${opacity * 1.5})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.update(w, h);
        p.draw(isDark);
      });
      
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };

    window.addEventListener("resize", handleResize);
    
    // Initial setup
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
