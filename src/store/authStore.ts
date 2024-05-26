import { create } from "zustand";

interface AuthState {
    isAuth: boolean;
    userName: string | null;
    setIsAuth: (isAuth: boolean) => void;
    setUserName: (userName: string) => void;
}

export const authStore = create<AuthState>((set) => ({
    isAuth: false,
    userName: null,
    setIsAuth: (isAuth: boolean) => set({ isAuth }),
    setUserName: (userName: string) => set({ userName }),
}));