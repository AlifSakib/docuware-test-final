import React, { useRef, useState, useEffect } from "react";
import "./HorizontalSplit.css";
import DocumentTray from "../../specific/document-tray";

const HorizontalSplit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPaneRef = useRef<HTMLDivElement>(null);
  const bottomPaneRef = useRef<HTMLDivElement>(null);
  const secondaryDividerRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (dragging) {
        setDragging(false);
        handleDragEnd(e);
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };

    if (dragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleDrag = (e: MouseEvent) => {
    if (!dragging || !containerRef.current || !secondaryDividerRef.current)
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newTop = e.clientY - containerRect.top;

    secondaryDividerRef.current.style.top = `${newTop}px`;
  };

  const handleDragEnd = (e: MouseEvent) => {
    if (!containerRef.current || !topPaneRef.current || !bottomPaneRef.current)
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;

    topPaneRef.current.style.height = `${newHeight}px`;
    bottomPaneRef.current.style.height = `calc(100% - ${newHeight}px - 10px)`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragging(true);

    if (secondaryDividerRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newTop = e.clientY - containerRect.top;
      secondaryDividerRef.current.style.top = `${newTop}px`;
    }
  };

  return (
    <div className="split-screen-horizontal" ref={containerRef}>
      <div className="top-pane" ref={topPaneRef}>
        <DocumentTray />
      </div>
      <div className="horizontal-divider" onMouseDown={handleMouseDown}>
        <span className="middle-line-horizontal"></span>
      </div>
      {dragging && (
        <div className="secondary-divider-horizontal" ref={secondaryDividerRef}>
          <span className="middle-line-horizontal"></span>
        </div>
      )}
      <div className="bottom-pane" ref={bottomPaneRef}>
        <DocumentTray />
      </div>
    </div>
  );
};

export default HorizontalSplit;
