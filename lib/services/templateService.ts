import { apiClient } from "./api"
import { Template, ApiResponse } from "@/lib/types"

export const templateService = {
  // Get all user templates (SECURED)
  async getAll(): Promise<Template[]> {
    try {
      const response =
        await apiClient.get<ApiResponse<Template[]>>("/templates")
      return response.data
    } catch (error) {
      console.error("Failed to fetch templates:", error)
      throw error
    }
  },

  // Get single template (SECURED)
  async getById(id: string): Promise<Template> {
    try {
      const response = await apiClient.get<ApiResponse<Template>>(
        `/templates/${id}`
      )
      return response.data
    } catch (error) {
      console.error(`Failed to fetch template ${id}:`, error)
      throw error
    }
  },

  // Create new template (SECURED)
  async create(
    data: Omit<Template, "id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<Template> {
    try {
      const response = await apiClient.post<ApiResponse<Template>>(
        "/templates",
        data
      )
      return response.data
    } catch (error) {
      console.error("Failed to create template:", error)
      throw error
    }
  },

  // Update template (SECURED)
  async update(id: string, data: Partial<Template>): Promise<Template> {
    try {
      const response = await apiClient.put<ApiResponse<Template>>(
        `/templates/${id}`,
        data
      )
      return response.data
    } catch (error) {
      console.error(`Failed to update template ${id}:`, error)
      throw error
    }
  },

  // Delete template (SECURED)
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/templates/${id}`)
    } catch (error) {
      console.error(`Failed to delete template ${id}:`, error)
      throw error
    }
  },

  // Duplicate template (SECURED)
  async duplicate(id: string): Promise<Template> {
    try {
      const response = await apiClient.post<ApiResponse<Template>>(
        `/templates/${id}/duplicate`,
        {}
      )
      return response.data
    } catch (error) {
      console.error(`Failed to duplicate template ${id}:`, error)
      throw error
    }
  },
}
