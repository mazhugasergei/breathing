import { create } from "zustand"

type CurrentBreathState = { stateNum: number; step: number }

interface State {
  excercises: typeof excercises
  selectedExcercise: keyof typeof excercises
  started: boolean
  passedPreparation: boolean
  currentBreath: CurrentBreathState | null
}

interface Actions {
  start: () => void
  stop: () => void
  passPreparation: (value?: boolean) => void
  setCurrentBreath: (breathState: CurrentBreathState | null) => void
}

// breathing may not start from "hold"
const excercises = {
  test: {
    name: "Test",
    preparation: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 2, description: "Exhale as much as you can" },
    ],
    breaths: [
      { state: "inhale", duration: 3 },
      { state: "hold", duration: 3 },
      { state: "exhale", duration: 3 },
      { state: "hold", duration: 3 },
    ],
  },
  "2-2": {
    name: "Calming 2-2",
    preparation: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 2, description: "Exhale as much as you can" },
    ],
    breaths: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 2 },
    ],
  },
  "3-3": {
    name: "Calming 3-3",
    preparation: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 3, description: "Exhale fully" },
    ],
    breaths: [
      { state: "inhale", duration: 3 },
      { state: "exhale", duration: 3 },
    ],
  },
  box: {
    name: "Box Breathing",
    preparation: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 3, description: "Exhale as much as you can" },
    ],
    breaths: [
      { state: "inhale", duration: 4 },
      { state: "hold", duration: 4 },
      { state: "exhale", duration: 4 },
      { state: "hold", duration: 4 },
    ],
  },
}

export const useStore = create<State & Actions>((set) => ({
  excercises,
  selectedExcercise: "test",
  started: false,
  passedPreparation: false,
  currentBreath: null,
  start: () => set((state) => ({ ...state, started: true })),
  stop: () => set((state) => ({ ...state, started: false })),
  passPreparation: (value = true) => set((state) => ({ ...state, passedPreparation: value })),
  setCurrentBreath: (breathState) => set((state) => ({ ...state, currentBreath: breathState })),
}))
