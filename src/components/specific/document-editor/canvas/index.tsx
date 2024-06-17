import {
  Stage,
  Rect as KonvaRect,
  Layer,
  Image as KonvaImage,
  Arrow as KonvaArrow,
} from "react-konva";
import "./styles.css";
import useImage from "../../../../hooks/useImage";
import { KonvaEventObject } from "konva/lib/Node";
import { Arrow } from "../types/paint.types";
import Konva from "konva";
import React from "react";

interface CanvasProps {
  onStageMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  onStageMouseUp: () => void;
  onStageMouseMove: () => void;
  stageRef: React.RefObject<Konva.Stage>;
  arrows: { [key: string]: Arrow[] };
  drawAction: string;
  selectedLayers: string[];

  activeLayer: string | null;
  onBgClick: (e: KonvaEventObject<MouseEvent>) => void;
  transformerRef: React.RefObject<Konva.Transformer>;
}

const Canvas = ({
  onStageMouseDown,
  onStageMouseUp,
  onStageMouseMove,
  onBgClick,
  arrows,
  selectedLayers,

  stageRef,
}: CanvasProps): JSX.Element => {
  const SIZE = 500;

  const [image] = useImage(
    "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTg0MjA0NTh8MA&ixlib=rb-4.0.3"
  );

  return (
    <div className="canvas">
      <Stage
        width={SIZE}
        height={SIZE}
        ref={stageRef}
        onMouseUp={onStageMouseUp}
        onMouseDown={onStageMouseDown}
        onMouseMove={onStageMouseMove}
      >
        <Layer>
          <KonvaRect
            x={0}
            y={0}
            height={SIZE}
            width={SIZE}
            fill="white"
            id="bg"
            onClick={onBgClick}
          />
          {image && (
            <KonvaImage image={image} x={0} y={0} height={SIZE} width={SIZE} />
          )}
        </Layer>
        <Layer visible={selectedLayers.includes("layer1")}>
          {arrows.layer1.map((arrow) => (
            <KonvaArrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.color}
              stroke={arrow.color}
              strokeWidth={4}
            />
          ))}
        </Layer>
        <Layer visible={selectedLayers.includes("layer2")}>
          {arrows?.layer2.map((arrow) => (
            <KonvaArrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.color}
              stroke={arrow.color}
              strokeWidth={4}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
