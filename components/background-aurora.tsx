"use client"

import Aurora from "./aurora"

export default function BackgroundAurora() {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden">
      <Aurora colorStops={["#00e5ff", "#10b981", "#00b4cc"]} blend={0.5} amplitude={1.0} speed={0.3} />
    </div>
  )
}
