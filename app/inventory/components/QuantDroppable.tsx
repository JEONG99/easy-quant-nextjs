"use client";

import { useDroppable } from "@dnd-kit/core";
import { Quant } from "../page";
import Draggable from "./Draggable";

interface QuantDroppableProps {
  items: Quant[];
}

const QuantDroppable: React.FC<QuantDroppableProps> = ({ items }) => {
  const { setNodeRef } = useDroppable({ id: "quant" });

  return (
    <div ref={setNodeRef}>
      <div className="mt-8 grid grid-cols-4 gap-8">
        {items.map((item) => (
          <Draggable key={item.id} id={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default QuantDroppable;
