import Circle from "./components/Circle"
import UI from "./components/UI"

export default () => {
  return (
    <div className="isolate w-screen h-screen bg-[#00000070] font-semibold text-sm text-[#fff]">
      <Circle />
      <UI />
    </div>
  )
}
