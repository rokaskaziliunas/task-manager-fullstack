"use client"

import { Task } from "@/types/task"
import { useEffect, useState } from "react"

const API_URL = "http://localhost:5219/api/tasks"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        setTasks(data)
      } catch (err) {
        console.error("Failed to fetch tasks", err)
      }
    }
    fetchTasks()
  }, [])

  const handleAddTask = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, description }),
    })

    setTitle("")
    setDescription("")
    if (res.ok) {
      const newTask: Task = await res.json()
      setTasks((prev) => [newTask, ...prev])
    }
  }

  const handleToggle = async (id: number) => {
    let previousTasks: Task[] = []
    setTasks((prev) => {
      previousTasks = prev
      return prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      )
    })
    try {
      const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" })
      if (!res.ok) {
        throw new Error("Server failed to toggle task")
      }
    } catch (err) {
      setTasks(previousTasks)
      alert("Failed to update task. Reverting changes")
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    let previousTasks: Task[] = []
    setTasks((prev) => {
      previousTasks = prev
      return prev.filter((task) => task.id !== id)
    })

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      if (!res.ok) {
        throw new Error("Server failed to delete task")
      }
    } catch (err) {
      setTasks(previousTasks)
      alert("Could not delete task. Restoring item.")
      console.error(err)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <form
        onSubmit={handleAddTask}
        className="mb-8 space-y-3 bg-slate-50 p-4 rounded-lg border"
      >
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
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
                onClick={() => handleToggle(task.id)}
                className={`px-3 py-1 text-sm rounded ${task.isCompleted ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}
              >
                {task.isCompleted ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
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
