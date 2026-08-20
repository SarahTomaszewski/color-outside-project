"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveals its children once they scroll into view.
 *
 * The hidden state lives in CSS behind `.js`, so if this never runs the
 * content is simply visible rather than stuck at opacity 0.
 */
export function Reveal({
  children,
  anim = "up",
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  anim?: "up" | "right" | "left" | "scale" | "clip" | "fade";
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    // Already on screen at mount — don't wait to be told.
    if (inView() || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }

    // `threshold: 0` fires the moment any sliver intersects. A fractional
    // threshold can never be met by an element taller than the viewport,
    // which is how whole sections ended up stuck hidden.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    // Backstop: if the observer never reports — throttled tab, hidden
    // document, transformed ancestor — plain geometry still reveals it.
    const onScroll = () => {
      if (inView()) {
        setVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`co-reveal ${className ?? ""}`}
      data-anim={anim}
      data-visible={visible ? "true" : undefined}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

/**
 * A display heading whose lines rise from a masked baseline, one beat apart.
 * Renders as real text in a single heading element for screen readers.
 */
export function RevealLines({
  lines,
  className,
  stagger = 90,
  as: Tag = "h2",
}: {
  lines: readonly string[];
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    if (inView() || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (inView()) {
        setVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
    >
      {lines.map((line, i) => (
        <span
          key={line + i}
          className="co-line"
          data-visible={visible ? "true" : undefined}
        >
          <span style={{ transitionDelay: `${i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Scroll-linked vertical drift. `speed` is the total travel in pixels across
 * the element's pass through the viewport; sign sets the direction.
 */
export function Parallax({
  children,
  speed = 30,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;

      // -1 when the element sits below the fold, 1 when it has passed above.
      const progress =
        (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2);
      node.style.transform = `translate3d(0, ${(progress * speed).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
