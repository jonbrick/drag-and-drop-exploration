"use client";

import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import BoardColumn from "@/components/BoardColumn";

// Define the string literal options for ColumnId
type ColumnId = "column-1" | "column-2";

// Define the structure of TaskCard object
interface TaskCard {
  id: string;
  title: string;
}

// Define the structure of Columns object
interface Columns {
  [key: string]: TaskCard[];
}

export default function Home() {
  // Initialize the State with column content
  const [columns, setColumns] = useState<Columns>({
    "column-1": [
      { id: "1", title: "TaskCard 1" },
      { id: "2", title: "TaskCard 2" },
    ],
    "column-2": [],
  });

  // Helper function to find which column a task belongs to
  const findColumnOfTask = (cardId: string): ColumnId | undefined => {
    return Object.keys(columns).find((columnId) =>
      columns[columnId as ColumnId].some((card) => card.id === cardId)
    ) as ColumnId | undefined;
  };

  // Handle the drag end event
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // Check if the task was dropped in a different column
    if (!over || active.id === over.id) return;

    const fromColumn = findColumnOfTask(active.id);
    const toColumn = over.id as ColumnId;

    if (fromColumn && fromColumn !== toColumn) {
      const task = columns[fromColumn].find(
        (taskCard) => taskCard.id === active.id
      );
      if (task) {
        setColumns((prev) => ({
          ...prev,
          [fromColumn]: prev[fromColumn].filter(
            (taskCard) => taskCard.id !== active.id
          ),
          [toColumn]: [...prev[toColumn], task],
        }));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4">
        <BoardColumn id="column-1" title="Col 1" cards={columns["column-1"]} />
        <BoardColumn id="column-2" title="Col 2" cards={columns["column-2"]} />
      </div>
    </DndContext>
  );
}
