import { publicApiClient, apiClient } from "./api"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface SignupRequest {
  email: string
  password: string
  name: string
}

export const authService = {
  // Login with email/password
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await publicApiClient.post<LoginResponse>(
        "/auth/login",
        credentials
      )

      // Store token
      if (response.token) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      return response
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  },

  // Sign up
  async signup(data: SignupRequest): Promise<LoginResponse> {
    try {
      const response = await publicApiClient.post<LoginResponse>(
        "/auth/signup",
        data
      )

      // Store token
      if (response.token) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      return response
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  },

  // Get current token
  getToken(): string | null {
    return localStorage.getItem("authToken")
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  // Refresh token
  async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post<{ token: string }>(
        "/auth/refresh",
        {}
      )
      if (response.token) {
        localStorage.setItem("authToken", response.token)
      }
      return response.token
    } catch (error) {
      console.error("Token refresh failed:", error)
      throw error
    }
  },
}
