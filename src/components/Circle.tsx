import { useEffect, useState } from "react"
import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const started = useStore((state) => state.started)
  const start = useStore((state) => state.start)
  const passedPreparation = useStore((state) => state.passedPreparation)
  const passPreparation = useStore((state) => state.passPreparation)
  const currentBreath = useStore((state) => state.currentBreath)
  const setCurrentBreath = useStore((state) => state.setCurrentBreath)

  const [timeoutId, setTimeoutId] = useState<number>()
  const [sizeUnit, setSizeUnit] = useState("")

  const initialWidth = 50 // %
  const minWidth = 50 // %
  const [currWidth, setCurrWidth] = useState(initialWidth) // %

  useEffect(() => {
    setSizeUnit(window.innerWidth > window.innerHeight ? "vh" : "vw")
    window.addEventListener("resize", () => {
      setSizeUnit(window.innerWidth > window.innerHeight ? "vh" : "vw")
    })
  }, [])

  useEffect(() => {
    if (started) {
      setCurrentBreath({ stateNum: 1, step: 1 })
    } else {
      passPreparation(false)
      setCurrentBreath(null)
      if (timeoutId) clearTimeout(timeoutId)
      setTimeoutId(undefined)
      setCurrWidth(initialWidth)
    }
  }, [started])

  useEffect(() => {
    if (!currentBreath) return

    const currentSegment = passedPreparation ? "breaths" : "preparation"
    const currentExcercise = excercises[selectedExcercise][currentSegment]
    const currentState = currentExcercise[currentBreath.stateNum - 1].state
    const currentDuration = currentExcercise[currentBreath.stateNum - 1].duration

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

    const newStateNum = currentBreath.step === currentDuration ? currentBreath.stateNum + 1 : currentBreath.stateNum
    const actualNewStateNum = newStateNum > currentExcercise.length ? 1 : newStateNum
    const newStep = currentBreath.step === currentDuration ? 1 : currentBreath.step + 1
    const timeoutId = setTimeout(() => {
      if (
        !passedPreparation &&
        currentBreath.stateNum === currentExcercise.length &&
        currentBreath.step === currentDuration
      ) {
        passPreparation()
      }
      setCurrentBreath({
        stateNum: actualNewStateNum,
        step: newStep,
      })
    }, 1000)

    setTimeoutId(timeoutId)
  }, [currentBreath])

  return (
    <div
      className={`min-w-[15rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center`}
      style={{
        width: sizeUnit === "vh" ? "40vh" : "50vw",
      }}
    >
      <div
        className={`aspect-square flex flex-col items-center justify-center text-lg text-[#555] bg-[#eee] rounded-full overflow-hidden transition`}
        style={(() => {
          const currentSegment = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentSegment]
          const currentState = currentBreath ? currentExcercise[currentBreath.stateNum - 1].state : "hold"
          const currentDuration = currentBreath ? currentExcercise[currentBreath.stateNum - 1].duration : 1

          const prevState =
            currentBreath && currentBreath.stateNum > 1 ? currentExcercise[currentBreath.stateNum - 2].state : null

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
            Start
          </button>
        )}
      </div>
    </div>
  )
}
