"use client"

import Aurora from "./aurora"

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
      <Aurora colorStops={["#00d8ff", "#3A29FF", "#00d8ff"]} blend={0.5} amplitude={1.0} speed={0.3} />
    </div>
  )
}
