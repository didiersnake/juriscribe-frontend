// User & Auth
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

// Template
export interface Template {
  id: string
  name: string
  description: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}

// Document
export interface Document {
  id: number
  filePath: string
  fileName: string
  documentType: number
  lawDomain: number
  jurisdiction: number
  last_opened: string
  user_id: string
  createdAt: string
  // updatedAt: string
}

export interface DocumentRequest {
  file: File
  documentTypeId: number
  lawDomainId: number
  jurisdictionId: number
}

export interface DocumentContentResponse {
  fileName: string
  id: number
  content: string
}

export interface DocumentFileType {
  id: number
  name: string
  description: string
  createdAt: string
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  message?: string
}
