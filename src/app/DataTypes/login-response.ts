export interface LoginResponse {
 success: boolean;
  message: string;
  userName: string;
  token: string;
  isFirstLogin: boolean;
  userId: number;
  isActive: boolean;
}
