"use client"

import { useTasks } from "./hooks/useTasks"
import TaskForm from "./components/TaskForm"

export default function Home() {
  const { tasks, handleAddTask, handleDeleteTask, handleToggleTask } =
    useTasks()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white border rounded shadow-sm"
          >
            <div>
              <h3
                className={`font-bold text-gray-950 ${task.isCompleted ? "line-through" : ""}`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleTask(task.id)}
                className={`px-3 py-1 text-sm rounded ${task.isCompleted ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}
              >
                {task.isCompleted ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
