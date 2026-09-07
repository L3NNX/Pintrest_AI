export interface User {
  _id: string;
  username: string;
  fullname: string;
  email?: string;
  dp?: string;
  posts?: Post[];
  createdAt?: string;
}

export interface Post {
  _id: string;
  image: string;
  imageText: string;
  user: {
    _id: string;
    username: string;
    fullname: string;
    dp?: string;
  };
  likes: string[];
  createdAt: string;
}

export interface PresignedResponse {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username?: string;
  user?: User;
}

