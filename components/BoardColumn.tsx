"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";

interface BoardColumnProps {
  id: string;
  title: string;
  cards: { id: string; title: string }[];
}

export default function BoardColumn({ id, title, cards }: BoardColumnProps) {
  // Use the useDroppable hook to make this column a valid drop target
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded border shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {cards.map((cards) => (
          <TaskCard key={cards.id} id={cards.id} title={cards.title} />
        ))}
      </div>
    </div>
  );
}
