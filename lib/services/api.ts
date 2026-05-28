import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios"

export const API_BASE_URL = "http://localhost:8888"
//   process.env.NEXT_PUBLIC_API_BASE_URL ||

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   // "Content-Type": "multipart/form-data",
  // },
  withCredentials: true,
})

// Request interceptor - Add auth token to all secured requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Only set Content-Type if the data is NOT FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")
      // Redirect to login if needed
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
    }

    return Promise.reject(error)
  }
)

export const apiClient = {
  // GET request
  async get<T>(endpoint: string) {
    try {
      const response = await axiosInstance.get<T>(endpoint)
      return response.data
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error)
      throw error
    }
  },

  // POST request
  async post<T>(endpoint: string, data: unknown) {
    try {
      const response = await axiosInstance.post<T>(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error)
      throw error
    }
  },

  // PUT request
  async put<T>(endpoint: string, data: unknown) {
    try {
      const response = await axiosInstance.put<T>(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error)
      throw error
    }
  },

  // PATCH request
  async patch<T>(endpoint: string, data: unknown) {
    try {
      const response = await axiosInstance.patch<T>(endpoint, data)
      return response.data
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error)
      throw error
    }
  },

  // DELETE request
  async delete<T>(endpoint: string) {
    try {
      const response = await axiosInstance.delete<T>(endpoint)
      return response.data
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error)
      throw error
    }
  },
}

// Public API client - No token auth
export const publicApiClient = {
  async get<T>(endpoint: string) {
    console.log(`${API_BASE_URL}${endpoint}`)

    try {
      const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`)
      return response.data
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error)
      throw error
    }
  },

  async post<T>(endpoint: string, data: unknown) {
    try {
      const response = await axios.post<T>(`${API_BASE_URL}${endpoint}`, data)
      return response.data
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error)
      throw error
    }
  },
}
