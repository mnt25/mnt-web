import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Chỉ chạy animation 1 lần
        }
      },
      { threshold: 0.15 } // Hiện khi 15% phần tử xuất hiện
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width,
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{ height: "100%" }}
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
