// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useRef } from "react";
// import "./SplitScreen.css";
// import DocumentEditor from "../../specific/document-editor";

// const SplitScreen: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const leftPaneRef = useRef<HTMLDivElement>(null);
//   const rightPaneRef = useRef<HTMLDivElement>(null);

//   const handleDrag = (e: MouseEvent) => {
//     if (!containerRef.current || !leftPaneRef.current || !rightPaneRef.current)
//       return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const newWidth = e.clientX - containerRect.left;

//     leftPaneRef.current.style.width = `${newWidth}px`;
//     rightPaneRef.current.style.width = `calc(100% - ${newWidth}px - 5px)`;
//   };

//   const handleDragEnd = (_e: MouseEvent) => {
//     document.removeEventListener("mousemove", handleDrag);
//     document.removeEventListener("mouseup", handleDragEnd);
//   };

//   const handleMouseDown = (
//     _e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     document.addEventListener("mousemove", handleDrag);
//     document.addEventListener("mouseup", handleDragEnd);
//   };

//   return (
//     <div className="split-screen" ref={containerRef}>
//       <div className="left-pane" ref={leftPaneRef}>
//         <h2>Left Pane</h2>
//         <p>This is the left pane.</p>
//       </div>
//       <div className="divider" onMouseDown={handleMouseDown} draggable></div>
//       <div className="right-pane" ref={rightPaneRef}>
//         <DocumentEditor />
//       </div>
//     </div>
//   );
// };

// export default SplitScreen;

import React, { useRef, useState, useEffect } from "react";
import "./VertialSplit.css";
import DocumentEditor from "../../specific/document-editor";
import HorizontalSplit from "./horizontal-split";

const VerticalSplit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
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
    const newLeft = e.clientX - containerRect.left;

    secondaryDividerRef.current.style.left = `${newLeft}px`;
  };

  const handleDragEnd = (e: MouseEvent) => {
    if (!containerRef.current || !leftPaneRef.current || !rightPaneRef.current)
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    leftPaneRef.current.style.width = `${newWidth}px`;
    rightPaneRef.current.style.width = `calc(100% - ${newWidth}px - 10px)`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragging(true);

    if (secondaryDividerRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeft = e.clientX - containerRect.left;
      secondaryDividerRef.current.style.left = `${newLeft}px`;
    }
  };

  return (
    <div className="split-screen" ref={containerRef}>
      <div className="left-pane" ref={leftPaneRef}>
        <HorizontalSplit />
      </div>
      <div className="divider" onMouseDown={handleMouseDown}>
        <span className="middle-line"></span>
      </div>
      {dragging && (
        <div className="secondary-divider" ref={secondaryDividerRef}>
          <span className="middle-line"></span>
        </div>
      )}
      <div className="right-pane" ref={rightPaneRef}>
        <DocumentEditor />
      </div>
    </div>
  );
};

export default VerticalSplit;
