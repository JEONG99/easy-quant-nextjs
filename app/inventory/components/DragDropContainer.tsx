"use client";

import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Quant } from "../page";
import Thumbnail from "./Thumbnail";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  closestCorners,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DragDropContainerProps {
  items: Quant[];
}

type List = Record<UniqueIdentifier, Quant[]>;

const DragDropContainer: React.FC<DragDropContainerProps> = ({ items }) => {
  const [list, setList] = useState<List>({
    comparison: [{ id: uuidv4(), name: "RSI20-70 전략 포트" }],
    quant: items,
  });
  const [activeItem, setActiveItem] = useState<Quant | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  const findContainer = (id: UniqueIdentifier) => {
    if (id in list) {
      return id;
    }
    const keys = Object.keys(list) as ["comparison", "quant"];
    return keys.find((key) => list[key].find((item) => item.id === id));
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const item =
      list["comparison"].find((item) => item.id === active.id) ||
      list["quant"].find((item) => item.id === active.id) ||
      null;
    setActiveItem(item);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    const overId = over?.id;
    if (overId == null || active.id in list) {
      return;
    }
    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);
    if (!overContainer || !activeContainer) {
      return;
    }
    if (activeContainer !== overContainer) {
      setList((list) => {
        const activeItems = list[activeContainer];
        const overItems = list[overContainer];
        const overIndex = overItems.findIndex((item) => item.id === overId);
        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
        );

        let newIndex: number;

        if (overId in list) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...list,
          [activeContainer]: list[activeContainer].filter(
            (item) => item.id !== active.id
          ),
          [overContainer]: [
            ...list[overContainer].slice(0, newIndex),
            list[activeContainer][activeIndex],
            ...list[overContainer].slice(newIndex, list[overContainer].length),
          ],
        };
      });
    }
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in list && over?.id) {
    }

    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveItem(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveItem(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeIndex = list[activeContainer].findIndex(
        (item) => item.id === active.id
      );
      const overIndex = list[overContainer].findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== overIndex) {
        setList((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveItem(null);
  };

  return (
    <div className="mt-6">
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          id="comparison"
          strategy={horizontalListSortingStrategy}
          items={list.comparison}
        >
          <Droppable id="comparison">
            <div className="grid grid-cols-4 gap-4 min-h-[135px] bg-opacity-20 bg-purple-100 rounded-[10px] py-5 px-5">
              {list.comparison.map((item, index) => (
                <Draggable key={item.id} id={item.id}>
                  <Thumbnail item={item} />
                </Draggable>
              ))}
            </div>
          </Droppable>
        </SortableContext>
        <SortableContext id="quant" items={list.quant}>
          <Droppable id="quant">
            <div className="mt-8 grid grid-cols-4 gap-8">
              {list.quant.map((item, index) => (
                <Draggable key={item.id} id={item.id}>
                  <Thumbnail item={item} />
                </Draggable>
              ))}
            </div>
          </Droppable>
          <DragOverlay>
            {activeItem && <Thumbnail item={activeItem} isOverlay />}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragDropContainer;
