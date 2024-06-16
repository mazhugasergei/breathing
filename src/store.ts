import { create } from "zustand"

type CurrentSegmentState = { index: number; step: number }
type Excercise = {
  name: string
  preparation: { state: string; duration: number; description?: string }[]
  breaths: { state: string; duration: number; description?: string }[]
}

interface State {
  excercises: typeof excercises
  selectedExcercise: keyof typeof excercises
  started: boolean
  passedPreparation: boolean
  currentSegment: CurrentSegmentState | null
}

interface Actions {
  start: () => void
  stop: () => void
  passPreparation: (value?: boolean) => void
  setCurrentSegment: (breathState: CurrentSegmentState | null) => void
}

// breathing may not start from "hold"
const excercises: { [key: string]: Excercise } = {
  test: {
    name: "Test",
    preparation: [
      { state: "inhale", duration: 2 },
      { state: "exhale", duration: 2, description: "exhale as much as you can" },
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
      { state: "exhale", duration: 2, description: "exhale as much as you can" },
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
      { state: "exhale", duration: 3, description: "exhale fully" },
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
      { state: "exhale", duration: 3, description: "exhale as much as you can" },
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
  currentSegment: null,
  start: () => set((state) => ({ ...state, started: true })),
  stop: () => set((state) => ({ ...state, started: false })),
  passPreparation: (value = true) => set((state) => ({ ...state, passedPreparation: value })),
  setCurrentSegment: (breathState) => set((state) => ({ ...state, currentSegment: breathState })),
}))
