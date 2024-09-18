import Background from "@/components/bg";

export default function App () {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <div className="w-full h-full bg-red-400"></div>
    </div>
  )
}