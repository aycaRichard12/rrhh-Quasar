export interface UserData {
  id: number;
  username: string;
  name: string;
  role: 'operator' | 'admin' | 'supervisor';
  lastLogin: string;
}

export interface EnterpriseInfo {
  id: number;
  name: string;
  sector: string;
  plantId: string;
}

export interface LoginResponse {
  user: UserData;
  enterprise: EnterpriseInfo;
  token: string;
  expiresIn: number;
}

export interface ApiError {
  message: string;
  code?: string;
}