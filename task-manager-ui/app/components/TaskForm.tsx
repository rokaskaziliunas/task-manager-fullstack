"use client"

import { ITaskFormProps } from "@/types/task.types"
import { useState } from "react"

const TaskForm = ({ onAddTask }: ITaskFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask(title, description)
    setTitle("")
    setDescription("")
  }

  return (
    <form
      onSubmit={handleSubmit}
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
  )
}

export default TaskForm
