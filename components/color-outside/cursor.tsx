"use client";

import { useEffect, useRef } from "react";

import { STAR_PATH } from "./primitives";

const INTERACTIVE = 'a,button,[role="button"],input,select,textarea,summary,label';


/** Relative luminance of an `rgb()` / `rgba()` string, or null if see-through. */
function luminance(color: string): number | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[,/\s]+/).filter(Boolean).map(Number);
  const [r, g, b, a = 1] = parts;
  if (!a) return null;
  const ch = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

/** Walks up from a point to the first element that actually paints a colour. */
function groundIsLight(x: number, y: number): boolean {
  let el = document.elementFromPoint(x, y) as Element | null;
  let hops = 0;
  while (el && hops < 12) {
    const lum = luminance(getComputedStyle(el).backgroundColor);
    if (lum !== null) return lum > 0.62;
    el = el.parentElement;
    hops++;
  }
  return false;
}

/**
 * Ball cursor. It trails the pointer, inverts what it sits on, and switches
 * to a solid pastel over the pale cream sections where an inversion would
 * just read as a dark smudge. Size stays constant.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const dotEl = dot.current;
    const labelEl = label.current;
    if (!rootEl || !dotEl || !labelEl) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let visible = false;
    let lastZoneCheck = 0;

    const render = (now: number) => {
      // Lower easing = more drag. Reduced motion pins it to the pointer.
      const ease = reduced ? 1 : 0.13;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      rootEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Sampling the ground is the expensive bit, so throttle it.
      if (visible && now - lastZoneCheck > 120) {
        lastZoneCheck = now;
        dotEl.dataset.zone = groundIsLight(targetX, targetY) ? "light" : "dark";
      }

      frame = window.requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        rootEl.dataset.visible = "true";
      }
      const el = e.target as Element | null;
      // The sticker wins over the hover dot, but not over a real control
      // sitting inside the target. Its wording comes from the attribute, so
      // each surface says what it wants ("View", "Drag", …).
      const target = el?.closest?.("[data-cursor-sticker]");
      const sticker = !!target && !el?.closest?.("a,button");
      if (sticker) {
        const word = target.getAttribute("data-cursor-sticker") || "View";
        if (labelEl.textContent !== word) labelEl.textContent = word;
      }
      rootEl.dataset.sticker = sticker ? "true" : "false";
      dotEl.dataset.hover =
        !sticker && el?.closest?.(INTERACTIVE) ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      delete rootEl.dataset.visible;
    };

    /*
      An open modal <dialog> lives in the top layer, which paints above every
      z-index in the normal layer — the ball would disappear behind it while
      `cursor: none` still applied, leaving no pointer at all. Promoting the
      ball to a manual popover puts it in the top layer too. Top-layer order
      is order of entry, so re-show it whenever a dialog opens to lift it
      back above. Browsers without the popover API keep the z-index path.
    */
    const canPopover = typeof rootEl.showPopover === "function";
    const lift = () => {
      if (!canPopover) return;
      try {
        if (rootEl.matches(":popover-open")) rootEl.hidePopover();
        rootEl.showPopover();
      } catch {
        /* not connected yet — the next dialog open will retry */
      }
    };
    if (canPopover) {
      rootEl.setAttribute("popover", "manual");
      lift();
    }

    const dialogWatcher = new MutationObserver((records) => {
      for (const r of records) {
        const el = r.target as Element;
        if (el instanceof HTMLDialogElement && el.open) {
          lift();
          return;
        }
      }
    });
    dialogWatcher.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });

    document.documentElement.classList.add("co-cursor-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("co-cursor-on");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frame);
      dialogWatcher.disconnect();
      if (canPopover && rootEl.matches(":popover-open")) rootEl.hidePopover();
    };
  }, []);

  return (
    <div ref={root} className="co-cursor" aria-hidden="true">
      <div ref={dot} className="co-cursor-dot" />

      <div className="co-cursor-sticker">
        <svg viewBox="0 0 100 100" className="co-cursor-star">
          <path d={STAR_PATH} fill="var(--color-cobalt)" stroke="var(--color-cream)" strokeWidth="5" />
        </svg>
        <span ref={label} className="co-cursor-sticker-label">
          View
        </span>
      </div>
    </div>
  );
}
