import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const passedPreparation = useStore((state) => state.passedPreparation)
  const currentSegment = useStore((state) => state.currentSegment)
  const started = useStore((state) => state.started)
  const stop = useStore((state) => state.stop)

  return (
    <nav className="w-full absolute z-[-1] inset-0">
      {/* breath */}
      {started &&
        currentSegment &&
        (() => {
          const currentPart = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentPart]
          const currentState = currentSegment ? currentExcercise[currentSegment.index].state : "hold"
          const currentDescription = currentExcercise[currentSegment.index].description
          const text = currentDescription ?? currentState

          return <div className="w-full max-w-[50vw] absolute top-0 left-0 text-xl p-2">{text}</div>
        })()}

      {/* seconds */}
      {started &&
        currentSegment &&
        (() => {
          const currentPart = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentPart]
          const currentDuration = currentExcercise[currentSegment.index].duration
          return <div className="absolute top-0 right-0 text-3xl p-2">{currentDuration - currentSegment.step}</div>
        })()}

      {/* end exercise */}
      {started && (
        <button onClick={stop} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2">
          End now
        </button>
      )}

      {/* debug */}
      <div className="absolute bottom-0 left-0 p-2">
        <div>started: {started.toString()}</div>
        <div>passedPreparation: {passedPreparation.toString()}</div>
        <div>
          selectedExcercise: {selectedExcercise} (part: {passedPreparation ? "breaths" : "preparation"}, segments:{" "}
          {(() => {
            const currentPart = passedPreparation ? "breaths" : "preparation"
            const currentExcercise = excercises[selectedExcercise][currentPart]
            return currentExcercise.length
          })()}
          )
        </div>
        <div>currentSegment: {JSON.stringify(currentSegment)}</div>
      </div>
    </nav>
  )
}
