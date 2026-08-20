import { ITask } from "@/types/task.types"
import { useState } from "react"
import { taskService } from "../services/taskService"

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleAddTask = async (title: string, description: string) => {
    const newTask = await taskService.addTask(title, description)
    setTasks((prev) => [...prev, newTask])
  }

  const handleToggleTask = async (id: number) => {
    await taskService.toggleTask(id)
    setTasks((prev) => {
      return prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      )
    })
  }

  const handleDeleteTask = async (id: number) => {
    await taskService.deleteTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return { tasks, handleAddTask, handleDeleteTask, handleToggleTask }
}
