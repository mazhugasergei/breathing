import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const currentBreath = useStore((state) => state.currentBreath)
  const started = useStore((state) => state.started)
  const stop = useStore((state) => state.stop)

  return (
    <nav className="w-full absolute z-[-1] inset-0">
      {/* breath */}
      {started && currentBreath && (
        <div className="w-full max-w-[50vw] absolute top-0 left-0 text-xl p-2">
          {excercises[selectedExcercise].breaths[currentBreath.stateNum].state === "inhale"
            ? "Inhale"
            : excercises[selectedExcercise].breaths[currentBreath.stateNum].state === "exhale"
            ? "Exhale"
            : "Hold"}
        </div>
      )}

      {/* seconds */}
      {started && currentBreath && (
        <div className="absolute top-0 right-0 text-3xl p-2">
          {excercises[selectedExcercise].breaths[currentBreath.stateNum].duration + 1 - currentBreath.step}
        </div>
      )}

      {/* end exercise */}
      {started && (
        <button onClick={stop} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2">
          End now
        </button>
      )}
    </nav>
  )
}
