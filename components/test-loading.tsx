// "use client"

// import { useState } from "react"
// import LoadingScreen from "./loading-screen"

// export default function TestLoading() {
//   const [showLoading, setShowLoading] = useState(false)

//   const handleFinishLoading = () => {
//     console.log("Loading finished!")
//     setShowLoading(false)
//   }

//   const startLoading = () => {
//     setShowLoading(true)
//   }

//   return (
//     <div className="p-8">
//       <button
//         onClick={startLoading}
//         className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
//       >
//         Test Loading Screen
//       </button>

//       {showLoading && <LoadingScreen finishLoading={handleFinishLoading} />}
//     </div>
//   )
// }
