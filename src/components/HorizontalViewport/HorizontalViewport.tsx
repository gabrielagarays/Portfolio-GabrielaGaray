import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import "./HorizontalViewport.css";

interface HorizontalViewportProps {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

export default function HorizontalViewport({
  viewportRef,
  trackRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  children,
}: HorizontalViewportProps) {
  return (
    <div
      className="horizontal-viewport"
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="horizontal-track" ref={trackRef}>
        {children}
      </div>
    </div>
  );
}
