import { useEffect, useState } from "react"
import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const started = useStore((state) => state.started)
  const start = useStore((state) => state.start)
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
      setCurrentBreath({ stateNum: 0, step: 1 })
    } else {
      setCurrentBreath(null)
      if (timeoutId) clearTimeout(timeoutId)
      setTimeoutId(undefined)
    }
  }, [started])

  useEffect(() => {
    if (currentBreath) {
      setCurrWidth((prev) => {
        switch (excercises[selectedExcercise].breaths[currentBreath.stateNum].state) {
          case "inhale":
            return 100
          case "exhale":
            return minWidth
          default:
            return prev
        }
      })

      const newStep =
        currentBreath.step === excercises[selectedExcercise].breaths[currentBreath.stateNum].duration
          ? 1
          : currentBreath.step + 1
      const newStateNum =
        currentBreath.step === excercises[selectedExcercise].breaths[currentBreath.stateNum].duration
          ? currentBreath.stateNum + 1
          : currentBreath.stateNum
      setTimeoutId(
        setTimeout(
          () =>
            setCurrentBreath({
              stateNum: newStateNum === excercises[selectedExcercise].breaths.length ? 0 : newStateNum,
              step: newStep,
            }),
          1000
        )
      )
    } else {
      setCurrWidth(initialWidth)
    }
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
        style={{
          width: `${currWidth}%`,
          boxShadow: `0 0 0 ${
            currentBreath
              ? excercises[selectedExcercise].breaths[currentBreath.stateNum].state === "hold"
                ? `2${sizeUnit}`
                : `5${sizeUnit}`
              : "0"
          } #ffffff30`,
          transition: `box-shadow ${
            currentBreath
              ? excercises[selectedExcercise].breaths[currentBreath.stateNum].state === "hold"
                ? 1
                : excercises[selectedExcercise].breaths[currentBreath.stateNum].duration
              : 1
          }s, width ${currentBreath ? excercises[selectedExcercise].breaths[currentBreath.stateNum].duration : 1}s`,
        }}
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
