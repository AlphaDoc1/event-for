import { LoginCredentials, RegisterCredentials, AuthResponse, Event, ApiResponse } from '@/types';

const API_URL = 'http://localhost:8080/api';

// Function to handle API errors and connection issues
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return { 
      success: false, 
      message: errorData.message || `Error: ${response.status} ${response.statusText}` 
    };
  }
  
  const data = await response.json();
  return { success: true, data };
};

// Auth service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        // Increased timeout to give the backend more time to respond
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      return handleResponse<AuthResponse>(response);
    } catch (error) {
      console.error('Login connection error:', error);
      return { 
        success: false, 
        message: error instanceof Error 
          ? (error.name === 'TimeoutError' 
              ? 'Connection timeout. Please ensure your Spring Boot backend is running at http://localhost:8080 and properly configured.' 
              : error.message)
          : 'Failed to connect to server. Please ensure your Spring Boot backend is running.'
      };
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        // Increased timeout to give the backend more time to respond
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      return handleResponse<AuthResponse>(response);
    } catch (error) {
      console.error('Registration connection error:', error);
      return { 
        success: false, 
        message: error instanceof Error 
          ? (error.name === 'TimeoutError' 
              ? 'Connection timeout. Please ensure your Spring Boot backend is running at http://localhost:8080 and properly configured.' 
              : error.message)
          : 'Failed to connect to server. Please ensure your Spring Boot backend is running.'
      };
    }
  },
};

// Events service
export const eventsService = {
  getEvents: async (token: string): Promise<ApiResponse<Event[]>> => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        signal: AbortSignal.timeout(10000)
      });
      
      return handleResponse<Event[]>(response);
    } catch (error) {
      console.error('Get events error:', error);
      return { 
        success: false, 
        message: error instanceof Error 
          ? (error.name === 'TimeoutError' 
              ? 'Connection timeout. Is the Spring Boot backend running?' 
              : error.message)
          : 'Failed to connect to server. Please check your backend connection.'
      };
    }
  },
  
  createEvent: async (token: string, event: Event): Promise<ApiResponse<Event>> => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(10000)
      });
      
      return handleResponse<Event>(response);
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  },
  
  updateEvent: async (token: string, event: Event): Promise<ApiResponse<Event>> => {
    try {
      const response = await fetch(`${API_URL}/events/${event.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(10000)
      });
      
      return handleResponse<Event>(response);
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  },
  
  deleteEvent: async (token: string, eventId: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        signal: AbortSignal.timeout(10000)
      });
      
      return handleResponse<void>(response);
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  },
};

// AI Chat service
export const chatService = {
  sendMessage: async (token: string, message: string): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(10000)
      });
      
      return handleResponse<string>(response);
    } catch (error) {
      console.error('Chat service error:', error);
      return { 
        success: false, 
        message: error instanceof Error 
          ? (error.name === 'TimeoutError' 
              ? 'Connection timeout. Is the Spring Boot backend running?' 
              : error.message)
          : 'Failed to connect to server. Please check your backend connection.'
      };
    }
  },
};
