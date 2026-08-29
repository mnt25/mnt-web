import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  overflow?: "hidden" | "visible";
}

// Global shared IntersectionObserver singleton to prevent hundreds of observer instances
type ObserverCallback = (isVisible: boolean) => void;
const listeners = new Map<Element, ObserverCallback>();

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = listeners.get(entry.target);
            if (cb) {
              cb(true);
              listeners.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );
  }
  return sharedObserver;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", overflow = "hidden" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    listeners.set(el, () => setIsVisible(true));
    observer.observe(el);

    return () => {
      listeners.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width,
        height: "100%",
        position: "relative",
        overflow,
      }}
    >
      <div
        style={{ height: "100%" }}
        className={`transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
