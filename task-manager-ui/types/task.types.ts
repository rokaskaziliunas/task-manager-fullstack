export interface ITask {
  id: number
  title: string
  description: string
  isCompleted: boolean
  createdAt: string
}

export interface ITaskFormProps {
  onAddTask: (title: string, description: string) => void
}
