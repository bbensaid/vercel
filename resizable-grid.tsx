"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

export function ResizableGrid({ children }: { children: React.ReactNode[] }) {
  const [gridLayout, setGridLayout] = useState({
    topLeftHeight: 50, // percentage
    topRightHeight: 50, // percentage
    leftWidth: 50, // percentage
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingHorizontal = useRef(false);
  const isDraggingVertical = useRef(false);

  const handleHorizontalResize = (e: MouseEvent) => {
    if (!isDraggingHorizontal.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;

    // Limit the minimum size
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setGridLayout((prev) => ({
        ...prev,
        leftWidth: newLeftWidth,
      }));
    }
  };

  const handleVerticalResize = (e: MouseEvent) => {
    if (!isDraggingVertical.current || !containerRef.current) return;

    const containerHeight = containerRef.current.clientHeight;
    const newTopHeight = (e.clientY / containerHeight) * 100;

    // Limit the minimum size
    if (newTopHeight > 20 && newTopHeight < 80) {
      setGridLayout((prev) => ({
        ...prev,
        topLeftHeight: newTopHeight,
        topRightHeight: newTopHeight,
      }));
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleHorizontalResize(e);
      handleVerticalResize(e);
    };

    const handleMouseUp = () => {
      isDraggingHorizontal.current = false;
      isDraggingVertical.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div
        className="absolute top-0 left-0 overflow-hidden rounded-lg border bg-background shadow"
        style={{
          width: `${gridLayout.leftWidth}%`,
          height: `${gridLayout.topLeftHeight}%`,
          padding: "1px",
        }}
      >
        {children[0]}
      </div>

      <div
        className="absolute top-0 overflow-hidden rounded-lg border bg-background shadow"
        style={{
          left: `${gridLayout.leftWidth}%`,
          width: `${100 - gridLayout.leftWidth}%`,
          height: `${gridLayout.topRightHeight}%`,
          padding: "1px",
        }}
      >
        {children[1]}
      </div>

      <div
        className="absolute left-0 overflow-hidden rounded-lg border bg-background shadow"
        style={{
          top: `${gridLayout.topLeftHeight}%`,
          width: `${gridLayout.leftWidth}%`,
          height: `${100 - gridLayout.topLeftHeight}%`,
          padding: "1px",
        }}
      >
        {children[2]}
      </div>

      <div
        className="absolute overflow-hidden rounded-lg border bg-background shadow"
        style={{
          top: `${gridLayout.topRightHeight}%`,
          left: `${gridLayout.leftWidth}%`,
          width: `${100 - gridLayout.leftWidth}%`,
          height: `${100 - gridLayout.topRightHeight}%`,
          padding: "1px",
        }}
      >
        {children[3]}
      </div>

      {/* Horizontal resize handle */}
      <div
        className="absolute top-0 bottom-0 w-2 cursor-col-resize bg-transparent hover:bg-primary/10 z-10"
        style={{ left: `calc(${gridLayout.leftWidth}% - 4px)` }}
        onMouseDown={() => {
          isDraggingHorizontal.current = true;
        }}
      />

      {/* Vertical resize handle */}
      <div
        className="absolute left-0 right-0 h-2 cursor-row-resize bg-transparent hover:bg-primary/10 z-10"
        style={{ top: `calc(${gridLayout.topLeftHeight}% - 4px)` }}
        onMouseDown={() => {
          isDraggingVertical.current = true;
        }}
      />

      {/* Intersection handle */}
      <div
        className="absolute w-4 h-4 cursor-move bg-transparent hover:bg-primary/20 z-20 rounded-full"
        style={{
          left: `calc(${gridLayout.leftWidth}% - 8px)`,
          top: `calc(${gridLayout.topLeftHeight}% - 8px)`,
        }}
        onMouseDown={() => {
          isDraggingHorizontal.current = true;
          isDraggingVertical.current = true;
        }}
      />
    </div>
  );
}
