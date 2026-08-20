const API_URL = process.env.NEXT_PUBLIC_API_URL!

export const taskService = {
  async addTask(title: string, description: string) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, description, isCompleted: false }),
    })
    if (!res.ok) throw new Error("Failed to add task")
    return res.json()
  },

  async toggleTask(id: number) {
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" })
    if (!res.ok) {
      throw new Error("Server failed to toggle task")
    }
  },

  async deleteTask(id: number) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete task.")
  },
}
