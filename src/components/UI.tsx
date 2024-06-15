import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const passedPreparation = useStore((state) => state.passedPreparation)
  const currentBreath = useStore((state) => state.currentBreath)
  const started = useStore((state) => state.started)
  const stop = useStore((state) => state.stop)

  return (
    <nav className="w-full absolute z-[-1] inset-0">
      {/* breath */}
      {started &&
        currentBreath &&
        (() => {
          const currentSegment = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentSegment]
          const currentState = currentBreath ? currentExcercise[currentBreath.stateNum - 1].state : "hold"
          const currentDescription = currentExcercise[currentBreath.stateNum - 1].description
          const text = currentDescription ?? currentState

          return <div className="w-full max-w-[50vw] absolute top-0 left-0 text-xl p-2">{text}</div>
        })()}

      {/* seconds */}
      {started &&
        currentBreath &&
        (() => {
          const currentSegment = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentSegment]
          const currentDuration = currentExcercise[currentBreath.stateNum - 1].duration
          return <div className="absolute top-0 right-0 text-3xl p-2">{currentDuration - currentBreath.step + 1}</div>
        })()}

      {/* end exercise */}
      {started && (
        <button onClick={stop} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2">
          End now
        </button>
      )}

      {/* debug */}
      <div className="absolute bottom-0 left-0 p-2">
        {!passedPreparation && <div>Preparation length: {excercises[selectedExcercise].preparation.length}</div>}
        <div>Segment: {passedPreparation ? "excercise" : "preparation"}</div>
        <div>Current breath: {JSON.stringify(currentBreath)}</div>
      </div>
    </nav>
  )
}
