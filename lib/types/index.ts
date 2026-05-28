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
  id: string
  file: File
  documentTypeId: number
  lawDomainId: number
  jurisdictionId: number
  content: string
  userId: string
  // createdAt: string
  // updatedAt: string
}

export interface DocumentRequest {
  file: File
  documentTypeId: number
  lawDomainId: number
  jurisdictionId: number
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
