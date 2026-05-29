import { apiClient } from "./api"
import { Document, ApiResponse } from "@/lib/types"

export const documentService = {
  // Get all user documents (SECURED)
  async getAll(): Promise<Document[]> {
    try {
      const response =
        await apiClient.get<ApiResponse<Document[]>>("/documents")
      return response.data
    } catch (error) {
      console.error("Failed to fetch documents:", error)
      throw error
    }
  },

  // Get single document (SECURED)
  async getById(id: string): Promise<Document> {
    try {
      const response = await apiClient.get<ApiResponse<Document>>(
        `/documents/${id}`
      )
      return response.data
    } catch (error) {
      console.error(`Failed to fetch document ${id}:`, error)
      throw error
    }
  },

  // Create new document from template (SECURED)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: FormData): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiClient.post<ApiResponse<any>>(
        "/api/documents",
        data
      )
      return response.data
    } catch (error) {
      console.error("Failed to create document:", error)
      throw error
    }
  },

  // Update document (SECURED)
  async update(id: string, data: Partial<Document>): Promise<Document> {
    try {
      const response = await apiClient.put<ApiResponse<Document>>(
        `/documents/${id}`,
        data
      )
      return response.data
    } catch (error) {
      console.error(`Failed to update document ${id}:`, error)
      throw error
    }
  },

  // Save document content (SECURED)
  async saveContent(id: string, content: string): Promise<Document> {
    try {
      const response = await apiClient.put<ApiResponse<Document>>(
        `/documents/${id}`,
        { content }
      )
      return response.data
    } catch (error) {
      console.error(`Failed to save document ${id}:`, error)
      throw error
    }
  },

  // Delete document (SECURED)
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/documents/${id}`)
    } catch (error) {
      console.error(`Failed to delete document ${id}:`, error)
      throw error
    }
  },

  // Export document as PDF (SECURED)
  async exportPDF(id: string): Promise<Blob> {
    try {
      const response = await apiClient.get<Blob>(`/documents/${id}/export/pdf`)
      return response
    } catch (error) {
      console.error(`Failed to export document ${id}:`, error)
      throw error
    }
  },
}
