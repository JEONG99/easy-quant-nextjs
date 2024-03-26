"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { Quant } from "../page";
import Thumbnail from "./Thumbnail";

interface DraggableProps {
  item: Quant;
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ id, item }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={twMerge(isDragging && "opacity-50")}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Thumbnail item={item} />
    </div>
  );
};

export default Draggable;
