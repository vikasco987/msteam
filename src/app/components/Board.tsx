// 'use client';

// import { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
//  import EditTaskModal from './EditTaskModal';
// import Countdown from './Countdown';

// type Task = {
//   id: string;
//   title: string;
//   status: string;
//   dueDate?: string;
// };

// const statusLabels = {
//   todo: 'To Do',
//   inprogress: 'In Progress',
//   done: 'Done',
// };

// export default function Board() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   useEffect(() => {
//     fetch('/api/tasks')
//       .then((res) => res.json())
//       .then((data) => setTasks(data.tasks))
//       .catch((err) => console.error('Failed to fetch tasks:', err));
//   }, []);

//   const handleDragEnd = (result: DropResult) => {
//     const {  destination } = result;

//     if (!destination) return;

//     const draggedTask = tasks.find((task) => task.id === result.draggableId);
//     if (!draggedTask || draggedTask.status === destination.droppableId) return;

//     const updated = tasks.map((task) =>
//       task.id === draggedTask.id ? { ...task, status: destination.droppableId } : task
//     );

//     setTasks(updated);

//     // Persist change to backend
//     fetch(`/api/tasks/${draggedTask.id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: destination.droppableId }),
//     });
//   };

//   const handleSave = (updatedTask: Task) => {
//     const updated = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
//     setTasks(updated);
//     setSelectedTask(null);
//   };

//   const handleDelete = (id: string) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//     setSelectedTask(null);
//     fetch(`/api/tasks/${id}`, { method: 'DELETE' });
//   };

//   return (
//     <>
//       <h2 className="text-2xl font-bold mb-4">Team Task Board</h2>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {Object.keys(statusLabels).map((statusKey) => (
//             <Droppable droppableId={statusKey} key={statusKey}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="bg-white p-4 rounded shadow-md min-h-[300px]"
//                 >
//                   <h3 className="font-semibold text-lg mb-3">{statusLabels[statusKey as keyof typeof statusLabels]}</h3>
//                   {tasks
//                     .filter((task) => task.status === statusKey)
//                     .map((task, index) => (
//                       <Draggable key={task.id} draggableId={task.id} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-gray-100 p-3 mb-3 rounded shadow-sm cursor-pointer hover:bg-gray-200"
//                             onClick={() => setSelectedTask(task)}
//                           >
//                             <h4 className="font-medium">{task.title}</h4>
//                             {task.dueDate && (
//                               <Countdown targetDate={task.dueDate} />
//                             )}
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>

//       {selectedTask && (
//         <EditTaskModal
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onSave={handleSave}
//           onDelete={handleDelete}
//         />
//       )}
//     </>
//   );
// }















'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import EditTaskModal from './EditTaskModal';
import Countdown from './Countdown';

type Task = {
  id: string;
  title: string;
  status: string;
  dueDate?: string;
};

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export default function Board() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;

    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, [isSignedIn]);

  const handleDragEnd = (result: DropResult) => {
    const { destination } = result;
    if (!destination) return;

    const draggedTask = tasks.find((task) => task.id === result.draggableId);
    if (!draggedTask || draggedTask.status === destination.droppableId) return;

    const updated = tasks.map((task) =>
      task.id === draggedTask.id ? { ...task, status: destination.droppableId } : task
    );

    setTasks(updated);

    // Persist change to backend
    fetch(`/api/tasks/${draggedTask.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: destination.droppableId }),
    });
  };

  const handleSave = (updatedTask: Task) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    setSelectedTask(null);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null);
    fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  };

  if (!isLoaded) return <div className="p-4">Loading...</div>;
  if (!isSignedIn) return <div className="p-4">Please sign in to view your tasks.</div>;

  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Hello, {user.firstName} 👋</h2>
        <p className="text-gray-500 mb-2">Team Task Board</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(statusLabels).map((statusKey) => (
            <Droppable droppableId={statusKey} key={statusKey}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded shadow-md min-h-[300px]"
                >
                  <h3 className="font-semibold text-lg mb-3">
                    {statusLabels[statusKey as keyof typeof statusLabels]}
                  </h3>
                  {tasks
                    .filter((task) => task.status === statusKey)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-3 mb-3 rounded shadow-sm cursor-pointer hover:bg-gray-200"
                            onClick={() => setSelectedTask(task)}
                          >
                            <h4 className="font-medium">{task.title}</h4>
                            {task.dueDate && <Countdown targetDate={task.dueDate} />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
