import { create } from "zustand";

interface AuthState {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const authStore = create<AuthState>((set) => ({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => set({ isAuth }),
}));