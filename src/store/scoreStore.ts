import { create } from "zustand";

interface ScoreStore {
    score: number;
    correct: number;
    skip: number;
    increment: (points: number) => void;
    decrement: (points: number) => void;
    incrementCorrect: () => void;
    incrementSkip: () => void;
    reset: () => void;
}

export const scoreStore = create<ScoreStore>((set) => ({
    score: 0,
    correct: 0,
    skip: 0,
    increment: (points) => set((state) => ({ score: state.score + points })),
    decrement: (points) => set((state) => ({ score: state.score - points })),
    incrementCorrect: () => set((state) => ({ correct: state.correct + 1 })),
    incrementSkip: () => set((state) => ({ skip: state.skip + 1 })),
    reset: () => set({ score: 0, correct: 0, skip: 0}),
}));