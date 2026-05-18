import React, { useEffect, useRef } from "react";

export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta);
  const dy = r * Math.sin(theta);
  return [x + dx, y + dy];
}

const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;

const GrowingRootsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let animationFrameId: number;
    let steps: Array<() => void> = [];
    let prevSteps: Array<() => void> = [];
    let lastTime = performance.now();
    const interval = 1000 / 40; 
    const MIN_BRANCH = 30;
    const len = 6;

    const initCanvas = (width: number, height: number) => {
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = dpr * width;
      canvas.height = dpr * height;
      ctx.scale(dpr, dpr);
    };

    const step = (
      x: number,
      y: number,
      rad: number,
      counter: { value: number } = { value: 0 }
    ) => {
      if (!ctx) return;
      const length = Math.random() * len;
      counter.value += 1;

      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + Math.random() * r15;
      const rad2 = rad - Math.random() * r15;

      if (
        nx < -100 ||
        nx > window.innerWidth + 100 ||
        ny < -100 ||
        ny > window.innerHeight + 100
      ) {
        return;
      }

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (Math.random() < rate) {
        steps.push(() => step(nx, ny, rad1, counter));
      }

      if (Math.random() < rate) {
        steps.push(() => step(nx, ny, rad2, counter));
      }
    };

    const frame = () => {
      if (performance.now() - lastTime < interval) {
        animationFrameId = requestAnimationFrame(frame);
        return;
      }

      prevSteps = steps;
      steps = [];
      lastTime = performance.now();

      if (prevSteps.length === 0) {
        return;
      }

      for (const fn of prevSteps) {
        if (Math.random() < 0.5) {
          steps.push(fn);
        } else {
          fn();
        }
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    const randomMiddle = () => Math.random() * 0.6 + 0.2;

    const startDrawing = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      initCanvas(width, height);
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      
      const isDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.08)";

      prevSteps = [];
      steps = [
        () => step(randomMiddle() * width, -5, r90),
        () => step(randomMiddle() * width, height + 5, -r90),
        () => step(-5, randomMiddle() * height, 0),
        () => step(width + 5, randomMiddle() * height, r180),
      ];

      if (width < 500) {
        steps = steps.slice(0, 2);
      }

      cancelAnimationFrame(animationFrameId);
      lastTime = performance.now();
      frame();
    };

    const observer = new MutationObserver(() => {
      startDrawing();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    startDrawing();

    const handleResize = () => {
      startDrawing();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none">
      {/* Light Theme Background + Grid Line (Pure White) */}
      <div 
        className="absolute inset-0 transition-colors duration-500 bg-[#ffffff] dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center top",
          maskImage: "radial-gradient(circle at 50% 25%, black 45%, rgba(0, 0, 0, 0.1) 90%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 25%, black 45%, rgba(0, 0, 0, 0.1) 90%)",
        }}
      />
      
      {/* Dark Theme Background*/}
      <div 
        className="absolute inset-0 transition-colors duration-500 hidden dark:block bg-[#000000]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center top",
          maskImage: "radial-gradient(circle at 50% 30%, black 45%, rgba(0, 0, 0, 0.15) 90%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 45%, rgba(0, 0, 0, 0.15) 90%)",
        }}
      />

      {/* Repeating Horizontal Accent Lines */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
          backgroundSize: "100% 160px",
        }}
      />
      <div 
        className="absolute inset-0 hidden dark:block opacity-30"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "100% 160px",
        }}
      />

      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, transparent 20%, black 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent 20%, black 80%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default GrowingRootsBackground;
