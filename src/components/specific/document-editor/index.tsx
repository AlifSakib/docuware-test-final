import Control from "./control";
import Toolbar from "./toolbar";
import "./styles.css";
import Canvas from "./canvas";
import { useCallback, useRef, useState } from "react";
import { Arrow } from "./types/paint.types";
import { v4 as uuidv4 } from "uuid";
import Konva from "konva";

const DocumentEditor = () => {
  const [drawAction, setDrawAction] = useState("arrow");
  const [selectedLayers, setSelectedLayers] = useState(["layer1"]);
  const [activeLayer, setActiveLayer] = useState<string | null>("layer1");
  const isPaintRef = useRef<boolean>(false);
  const stageRef = useRef<Konva.Stage | null>(null);
  const currentShapeRef = useRef<string | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [arrows, setArrows] = useState<{ [key: string]: Arrow[] }>({
    layer1: [],
    layer2: [],
  });

  console.log("arrows", arrows);

  const toggleLayer = (layer: string) => {
    setSelectedLayers((prevSelectedLayers) => {
      if (prevSelectedLayers.includes(layer)) {
        const newSelectedLayers = prevSelectedLayers.filter((l) => l !== layer);

        // If the active layer is being deselected
        if (activeLayer === layer) {
          // If there are other selected layers, set the active layer to one of them
          setActiveLayer(
            newSelectedLayers.length > 0 ? newSelectedLayers[0] : null
          );
        }

        return newSelectedLayers;
      } else {
        // Set the newly selected layer as active
        setActiveLayer(layer);
        return [...prevSelectedLayers, layer];
      }
    });
  };

  const onStageMouseDown = useCallback(() => {
    if (drawAction === "select") return;
    isPaintRef.current = true;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;

    switch (drawAction) {
      case "arrow": {
        setArrows((prevArrows) => ({
          ...prevArrows,
          [activeLayer as string]: [
            ...prevArrows[activeLayer as string],
            {
              points: [x, y, x, y],
              color: "red",
              id: id,
            },
          ],
        }));
        break;
      }

      default:
        break;
    }
  }, [drawAction, activeLayer]);

  const onStageMouseUp = useCallback(() => {
    if (drawAction === "select") return;
    isPaintRef.current = false;
    currentShapeRef.current = null;
  }, [drawAction]);

  const onStageMouseMove = useCallback(() => {
    if (drawAction === "select" || !isPaintRef.current) return;

    const stage = stageRef?.current;
    const id = currentShapeRef.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case "arrow": {
        setArrows((prevArrows) => ({
          ...prevArrows,
          [activeLayer as string]: prevArrows[activeLayer as string].map(
            (prevArrow) =>
              prevArrow.id === id
                ? {
                    ...prevArrow,
                    points: [prevArrow.points[0], prevArrow.points[1], x, y],
                  }
                : prevArrow
          ),
        }));
        break;
      }
    }
  }, [drawAction, activeLayer]);

  const onBgClick = useCallback(() => {
    transformerRef.current?.nodes([]);
  }, []);

  return (
    <div className="document-editor">
      <Control />
      <div className="editor">
        <Toolbar
          selectedLayers={selectedLayers}
          activeLayer={activeLayer}
          toggleLayer={toggleLayer}
          setDrawAction={setDrawAction}
        />
        <Canvas
          onStageMouseDown={onStageMouseDown}
          onStageMouseUp={onStageMouseUp}
          onStageMouseMove={onStageMouseMove}
          stageRef={stageRef}
          arrows={arrows}
          drawAction={drawAction}
          selectedLayers={selectedLayers}
          activeLayer={activeLayer}
          onBgClick={onBgClick}
          transformerRef={transformerRef}
        />
      </div>
    </div>
  );
};

export default DocumentEditor;
