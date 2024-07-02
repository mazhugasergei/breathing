import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "../store"

export default () => {
  const excercises = useStore((state) => state.excercises)
  const selectedExcercise = useStore((state) => state.selectedExcercise)
  const selectExcercise = useStore((state) => state.selectExcercise)
  const passedPreparation = useStore((state) => state.passedPreparation)
  const currentSegment = useStore((state) => state.currentSegment)
  const started = useStore((state) => state.started)
  const stop = useStore((state) => state.stop)

  return (
    <nav className="absolute z-[-1] inset-2">
      {/* logo */}
      {!started && (
        <div className="w-full flex justify-center mb-2">
          {/* lotus */}
          <svg
            fill="currentColor"
            height="32px"
            width="32px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.003 512.003"
            xmlSpace="preserve"
          >
            <path
              d="M511.955,204.025c-0.427-13.474-11.307-24.32-24.789-24.781l-3.55-0.043c-8.277,0-31.258,0.802-59.674,6.332
				c-5.086-38.4-15.386-65.664-16.239-67.84c-2.526-6.511-7.612-11.699-14.063-14.37c-3.14-1.297-6.468-1.946-9.796-1.946
				c-3.516,0-7.023,0.725-10.308,2.167c-1.877,0.828-22.554,10.146-48.35,28.305c-22.605-43.008-48.759-70.733-50.679-72.738
				c-4.838-5.052-11.52-7.902-18.5-7.902c-6.98,0-13.662,2.85-18.492,7.893c-1.92,2.005-28.109,29.773-50.722,72.823
				c-25.737-18.108-46.438-27.563-48.307-28.39c-3.285-1.442-6.793-2.167-10.308-2.167c-3.328,0-6.656,0.648-9.796,1.946
				c-6.451,2.671-11.529,7.868-14.063,14.37c-0.845,2.176-11.145,29.431-16.23,67.84c-28.433-5.538-51.405-6.323-59.682-6.323
				l-3.567,0.043c-13.474,0.461-24.363,11.307-24.789,24.781c-0.154,4.796-2.876,118.349,67.746,188.979
				c64.521,64.521,165.769,67.789,185.412,67.789l2.628-0.034c0.051,0,0.102,0.034,0.154,0.034c0.051,0,0.102-0.034,0.154-0.034
				l2.628,0.034c19.644,0,120.892-3.268,185.412-67.789C514.83,322.382,512.108,208.829,511.955,204.025z M383.844,126.969
				c0,0,10.257,26.863,14.942,64.563c-14.831,4.156-30.242,9.737-45.542,17.203c-3.968-19.055-9.916-36.915-16.922-53.248
				C362.468,136.543,383.844,126.969,383.844,126.969z M128.168,126.969c0,0,21.376,9.523,47.539,28.467
				c-7.023,16.384-12.996,34.313-16.964,53.436c-15.3-7.467-30.686-13.133-45.525-17.297
				C117.902,153.858,128.168,126.969,128.168,126.969z M85.911,374.905C22.303,311.298,25.64,204.836,25.64,204.836
				s0.964-0.026,2.756-0.026c13.414,0,73.199,2.133,126.182,30.677c-0.614,6.733-0.973,13.568-0.973,20.514
				c0,78.805,42.769,145.374,67.268,177.075C184.172,428.716,126.402,415.396,85.911,374.905z M256.569,434.596
				c-0.495-0.162-0.981-0.316-1.613-0.546c-9.011-9.822-75.75-85.76-75.75-178.048c0-98.97,76.8-179.2,76.8-179.2
				s76.8,80.23,76.8,179.2C332.806,350.969,262.286,428.469,256.569,434.596z M426.109,374.905
				c-40.491,40.491-98.261,53.811-134.963,58.172c24.491-31.701,67.26-98.27,67.26-177.075c0-6.989-0.358-13.867-0.99-20.642
				c52.983-28.518,112.794-30.558,126.199-30.558c1.792,0,2.756,0.026,2.756,0.026S489.708,311.298,426.109,374.905z"
            />
          </svg>
          {/* wind */}
          {/* <svg
            fill="currentColor"
            width="32px"
            height="32px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            viewBox="0 0 122.88 74.78"
          >
            <path d="M28.69,53.38c-1.61,0-2.91-1.3-2.91-2.91c0-1.61,1.3-2.91,2.91-2.91h51.37c0.21,0,0.42,0.02,0.62,0.07 c1.84,0.28,3.56,0.8,5.1,1.63c1.7,0.92,3.15,2.19,4.27,3.89c3.85,5.83,3.28,11.24,0.56,15.24c-1.77,2.61-4.47,4.55-7.45,5.57 c-3,1.03-6.32,1.13-9.32,0.03c-4.54-1.66-8.22-5.89-8.76-13.55c-0.11-1.6,1.1-2.98,2.7-3.09c1.6-0.11,2.98,1.1,3.09,2.7 c0.35,4.94,2.41,7.56,4.94,8.48c1.71,0.62,3.67,0.54,5.48-0.08c1.84-0.63,3.48-1.79,4.52-3.32c1.49-2.19,1.71-5.28-0.61-8.79 c-0.57-0.86-1.31-1.51-2.18-1.98c-0.91-0.49-1.97-0.81-3.13-0.99H28.69L28.69,53.38z M15.41,27.21c-1.61,0-2.91-1.3-2.91-2.91 c0-1.61,1.3-2.91,2.91-2.91h51.21c1.17-0.18,2.23-0.5,3.14-0.99c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79 c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7 c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57 c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H15.41 L15.41,27.21z M2.91,40.3C1.3,40.3,0,38.99,0,37.39c0-1.61,1.3-2.91,2.91-2.91h107.07c1.17-0.18,2.23-0.5,3.13-0.99 c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08 c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55 c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89 c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H2.91L2.91,40.3z" />
          </svg> */}
        </div>
      )}

      {/* select exercise */}
      {!started &&
        (() => {
          const exercisesKeys = Object.keys(excercises)
          const currentExcerciseIndex =
            typeof selectedExcercise === "number" ? selectedExcercise : exercisesKeys.indexOf(selectedExcercise)
          const prevExcercise = () => {
            const prevIndex = currentExcerciseIndex === 0 ? exercisesKeys.length - 1 : currentExcerciseIndex - 1
            selectExcercise(exercisesKeys[prevIndex])
          }
          const nextExcercise = () => {
            const nextIndex = currentExcerciseIndex === exercisesKeys.length - 1 ? 0 : currentExcerciseIndex + 1
            selectExcercise(exercisesKeys[nextIndex])
          }
          return (
            <div className="w-full md:max-w-[15rem] flex justify-between mx-auto">
              <button aria-label="previous excercise" onClick={prevExcercise} className="p-2 -m-2">
                <ChevronLeft size={16} />
              </button>
              <div>{excercises[selectedExcercise].name}</div>
              <button aria-label="next excercise" onClick={nextExcercise} className="p-2 -m-2">
                <ChevronRight size={16} />
              </button>
            </div>
          )
        })()}

      {/* breath */}
      {started &&
        currentSegment &&
        (() => {
          const currentPart = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentPart]
          const currentState = currentSegment ? currentExcercise[currentSegment.index].state : "hold"
          const currentDescription = currentExcercise[currentSegment.index].description
          const text = currentDescription ?? currentState

          return <div className="w-full max-w-[50vw] absolute top-0 left-0 text-xl">{text}</div>
        })()}

      {/* seconds */}
      {started &&
        currentSegment &&
        (() => {
          const currentPart = passedPreparation ? "breaths" : "preparation"
          const currentExcercise = excercises[selectedExcercise][currentPart]
          const currentDuration = currentExcercise[currentSegment.index].duration
          const secondsLeft = currentDuration - currentSegment.step
          return (
            <div className="absolute top-0 right-0 text-3xl">
              {secondsLeft < 10 && "0"}
              {secondsLeft}
            </div>
          )
        })()}

      {/* end exercise */}
      {started && (
        <button onClick={stop} className="absolute bottom-0 left-1/2 -translate-x-1/2">
          End now
        </button>
      )}

      {/* debug */}
      {/* <div className="max-md:hidden absolute bottom-0 left-0">
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
      </div> */}
    </nav>
  )
}
