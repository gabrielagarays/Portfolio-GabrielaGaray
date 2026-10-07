import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent as ReactPointerEvent } from "react";
import { sections } from "./data/sections";
import Header from "./components/Header/Header";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import MenuOverlay from "./components/MenuOverlay/MenuOverlay";
import HorizontalViewport from "./components/HorizontalViewport/HorizontalViewport";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Tools from "./components/Tools/Tools";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import ProgressRail from "./components/ProgressRail/ProgressRail";
import SectionDots from "./components/SectionDots/SectionDots";


export default function App() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const maxRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, target: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    targetRef.current = Math.min(section.offsetLeft, maxRef.current);
    setMenuOpen(false);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const measure = () => {
      maxRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
      targetRef.current = Math.min(targetRef.current, maxRef.current);
    };

    const update = () => {
      const difference = targetRef.current - currentRef.current;
      currentRef.current = reducedMotion
        ? targetRef.current
        : currentRef.current + difference * (draggingRef.current ? 0.22 : 0.085);

      if (Math.abs(difference) < 0.08) currentRef.current = targetRef.current;
      track.style.transform = `translate3d(${-currentRef.current}px, 0, 0)`;
      const progress = maxRef.current ? currentRef.current / maxRef.current : 0;
      document.documentElement.style.setProperty("--journey", String(progress));

      let closestIndex = 0;
      let closestDistance = Infinity;
      sections.forEach(({ id }, index) => {
        const node = document.getElementById(id);
        if (!node) return;
        const local = (node.offsetLeft - currentRef.current) / window.innerWidth;
        node.style.setProperty("--local", String(local));
        const distance = Math.abs(local);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveSection((previous) => (previous === closestIndex ? previous : closestIndex));
      frame = requestAnimationFrame(update);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      targetRef.current = Math.max(0, Math.min(maxRef.current, targetRef.current + delta * 1.1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      scrollToSection(sections[next].id);
    };

    measure();
    frame = requestAnimationFrame(update);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", measure);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSection]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button, input, textarea")) return;
    draggingRef.current = true;
    pointerStartRef.current = { x: event.clientX, target: targetRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const next = pointerStartRef.current.target - (event.clientX - pointerStartRef.current.x) * 1.25;
    targetRef.current = Math.max(0, Math.min(maxRef.current, next));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.classList.remove("is-dragging");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="app-shell">
       <CustomCursor />
      <Header
        menuOpen={menuOpen}
        onNavigate={scrollToSection}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />

      <MenuOverlay open={menuOpen} onNavigate={scrollToSection} />

      <HorizontalViewport
        viewportRef={viewportRef}
        trackRef={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Hero onNavigate={scrollToSection} />
        <About />
        <Tools />
        <Projects />
        <Contact sent={sent} onSubmit={onSubmit} />
      </HorizontalViewport>

      <ProgressRail />
      <SectionDots activeSection={activeSection} onNavigate={scrollToSection} />
    </main>
  );
}
