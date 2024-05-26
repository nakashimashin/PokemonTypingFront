import { create } from "zustand";

interface ScoreStore {
    score: number;
    increment: (score: number) => void;
    decrement: (score: number) => void;
    reset: () => void;
}

export const scoreStore = create<ScoreStore>((set) => ({
    score: 0,
    increment: (points) => set((state) => ({ score: state.score + points })),
    decrement: (points) => set((state) => ({ score: state.score - points })),
    reset: () => set({ score: 0 }),
}));