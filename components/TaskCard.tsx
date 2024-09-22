"use client";

import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  id: string;
  title: string;
}

export function TaskCard({ id, title }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  // Define the style object for the draggable element, applying a 3D transform when dragging
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card p-4 rounded border shadow cursor-pointer"
    >
      {title}
    </div>
  );
}
