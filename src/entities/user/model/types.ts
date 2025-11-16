export type User = {
    id: number;
    username: string;
    email: string;
    avatar: string | null;
  };
  
  export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface UserActions {
    setUser: (user: User) => void;
    clearUser: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    updateUser: (user: Partial<User>) => void;
  }
  
  export type UserStore = UserState & UserActions;
  