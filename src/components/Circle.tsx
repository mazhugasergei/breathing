import { useEffect, useState } from "react"
import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const started = useStore((state) => state.started)
  const start = useStore((state) => state.start)
  const passedPreparation = useStore((state) => state.passedPreparation)
  const passPreparation = useStore((state) => state.passPreparation)
  const currentSegment = useStore((state) => state.currentSegment)
  const setCurrentSegment = useStore((state) => state.setCurrentSegment)

  const [timeoutId, setTimeoutId] = useState<number>()
  const [sizeUnit, setSizeUnit] = useState("")

  const initialWidth = 50 // %
  const minWidth = 50 // %
  const [currWidth, setCurrWidth] = useState(initialWidth)

  useEffect(() => {
    setSizeUnit(window.innerWidth > window.innerHeight ? "vh" : "vw")
    window.addEventListener("resize", () => {
      setSizeUnit(window.innerWidth > window.innerHeight ? "vh" : "vw")
    })
  }, [])

  useEffect(() => {
    if (started) {
      setCurrentSegment({ index: 0, step: 0 })
    } else {
      passPreparation(false)
      setCurrentSegment(null)
      if (timeoutId) clearTimeout(timeoutId)
      setTimeoutId(undefined)
      setCurrWidth(initialWidth)
    }
  }, [started])

  useEffect(() => {
    if (!currentSegment) return

    const currentPart = passedPreparation ? "breaths" : "preparation"
    const currentExcercise = excercises[selectedExcercise][currentPart]
    const currentState = currentExcercise[currentSegment.index].state
    const currentDuration = currentExcercise[currentSegment.index].duration

    setCurrWidth((prev) => {
      switch (currentState) {
        case "inhale":
          return 100
        case "exhale":
          return minWidth
        default:
          return prev
      }
    })

    const newIndex = currentSegment.step === currentDuration - 1 ? currentSegment.index + 1 : currentSegment.index
    const actualNewIndex = newIndex === currentExcercise.length ? 0 : newIndex
    const newStep = currentSegment.step === currentDuration - 1 ? 0 : currentSegment.step + 1
    const timeoutId = setTimeout(() => {
      if (
        !passedPreparation &&
        currentSegment.index === currentExcercise.length - 1 &&
        currentSegment.step === currentDuration - 1
      ) {
        passPreparation()
      }
      setCurrentSegment({
        index: actualNewIndex,
        step: newStep,
      })
    }, 1000)

    setTimeoutId(timeoutId)
  }, [currentSegment])

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center`}
      style={{
        width: sizeUnit === "vh" ? "40vh" : "50vw",
      }}
    >
      <div
        className={`aspect-square flex flex-col items-center justify-center text-lg text-[#555] bg-[#eee] rounded-full overflow-hidden transition`}
        style={(() => {
          const currentPart = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentPart]
          const currentState = currentSegment ? currentExcercise[currentSegment.index].state : "hold"
          const currentDuration = currentSegment ? currentExcercise[currentSegment.index].duration : 1

          const prevState =
            currentSegment && currentSegment.index ? currentExcercise[currentSegment.index - 1].state : null

          const shadowWidth =
            currentState === "inhale" ? 5 : currentState === "exhale" ? 3 : prevState === "inhale" ? 2 : 1.5

          const width = `${currWidth}%`
          const boxShadow = `0 0 0 ${shadowWidth + sizeUnit} #ffffff30`
          const transition = `box-shadow ${currentState === "hold" ? 1 : currentDuration}s, width ${currentDuration}s`

          return { width, boxShadow, transition }
        })()}
      >
        {!started && (
          <button onClick={start} className="w-full h-full">
            start
          </button>
        )}
      </div>
    </div>
  )
}
