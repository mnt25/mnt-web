import React, { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  wind: number;
  step: number;
  stepSize: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  charIndex: number;
  isFlake: boolean;
}

const SNOW_CHARS = ["❄", "❅", "❆"];

export const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let inViewport = true;

    const updateSize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Track dark mode efficiently
    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => {
      updateSize();
    };

    // Pause animation when tab is in background or when scrolled past Hero
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (inViewport) {
        isRunning = true;
        lastDrawTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver: Pause 100% CPU when Hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && !document.hidden) {
          if (!isRunning) {
            isRunning = true;
            lastDrawTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Particle count suited for Hero banner area
    const flakeCount = Math.min(Math.floor(width / 60), 22);
    const flakes: Snowflake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      const isFlake = Math.random() > 0.45;
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isFlake ? Math.floor(Math.random() * 5 + 10) : Math.random() * 2 + 1.2,
        speed: Math.random() * 0.9 + 0.6,
        wind: Math.random() * 0.2 - 0.1,
        step: Math.random() * Math.PI * 2,
        stepSize: Math.random() * 0.012 + 0.006,
        opacity: Math.random() * 0.3 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        charIndex: Math.floor(Math.random() * SNOW_CHARS.length),
        isFlake,
      });
    }

    let lastDrawTime = performance.now();
    const targetInterval = 1000 / 36; // 36 FPS smooth capped

    const render = (time: number) => {
      if (!isRunning || !inViewport) return;

      const elapsed = time - lastDrawTime;
      if (elapsed < targetInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(elapsed / 16.67, 2.0);
      lastDrawTime = time - (elapsed % targetInterval);

      ctx.clearRect(0, 0, width, height);

      const baseColor = isDark ? "rgba(240, 248, 255, " : "rgba(75, 115, 155, ";

      ctx.font = "13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        flake.step += flake.stepSize * delta;
        flake.x += (Math.sin(flake.step) * 0.4 + flake.wind) * delta;
        flake.y += flake.speed * delta;
        flake.rotation += flake.rotationSpeed * delta;

        if (flake.y > height + 15) {
          flake.y = -15;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 15) {
          flake.x = -15;
        } else if (flake.x < -15) {
          flake.x = width + 15;
        }

        ctx.fillStyle = baseColor + flake.opacity + ")";

        if (flake.isFlake) {
          ctx.save();
          ctx.translate(flake.x, flake.y);
          ctx.rotate(flake.rotation);
          ctx.fillText(SNOW_CHARS[flake.charIndex], 0, 0);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2, false);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ pointerEvents: "none", contain: "strict" }}
    />
  );
};

export default SnowEffect;
