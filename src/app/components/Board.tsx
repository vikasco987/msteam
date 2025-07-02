"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Task = {
  id: string;
  title: string;
  status: string;
};

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tasks:", data); // 🔍 Inspect API response

        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.warn("API did not return array. Using fallback empty array.");
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
      });
  }, []);

  const onDragEnd = () => {
    // You can implement reordering logic here
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                className="bg-gray-100 rounded-lg p-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-xl font-bold mb-4">{column.title}</h2>

                {Array.isArray(tasks) &&
                  tasks
                    .filter((task) => task.status === column.id)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-white p-3 rounded shadow mb-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="font-medium">{task.title}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
