
export interface User {
  id?: string;
  name: string;
  email: string;
  token?: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  attendees?: string[];
  category?: string;
  isAllDay?: boolean;
  color?: string;
  createdBy?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}
