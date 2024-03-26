"use client";

import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FaPlus } from "react-icons/fa";

import { Quant } from "../page";
import Draggable from "./Draggable";
import Thumbnail from "./Thumbnail";

interface ComparisonDroppableProps {
  items: Quant[];
}

const ComparisonDroppable: React.FC<ComparisonDroppableProps> = ({ items }) => {
  const { over, isOver, setNodeRef } = useDroppable({ id: "comparison" });
  const isOverContainer =
    isOver || (over && !!items.find((item) => item.id === over.id));

  return (
    <div ref={setNodeRef}>
      <div
        className={twMerge(
          "grid grid-cols-4 gap-4 min-h-[135px] bg-purple-100 rounded-[10px] py-5 px-5 transition",
          items.length === 0 && "flex justify-center items-center",
          isOverContainer ? "bg-opacity-40" : "bg-opacity-20"
        )}
      >
        {items.length === 0 && <FaPlus size={28} className="text-purple-100" />}
        {items.map((item) => (
          <Draggable key={item.id} id={item.id}>
            <Thumbnail item={item} />
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default ComparisonDroppable;
