"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  finishLoading: () => void
}

export default function LoadingScreen({ finishLoading }: LoadingScreenProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    console.log("LoadingScreen mounted, finishLoading:", typeof finishLoading)
    setIsMounted(true)

    // Verify finishLoading is a function
    if (typeof finishLoading !== "function") {
      console.error("finishLoading is not a function:", finishLoading)
      return
    }

    const timeout = setTimeout(() => {
      console.log("LoadingScreen calling finishLoading")
      finishLoading()
    }, 3000)

    return () => {
      console.log("LoadingScreen cleanup")
      clearTimeout(timeout)
    }
  }, [finishLoading])

  console.log("LoadingScreen render, isMounted:", isMounted)

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        console.log("LoadingScreen exit complete")
        document.body.style.overflow = ""
      }}
    >
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Animated logo */}
            <motion.div
              className="text-8xl font-bold gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              AS
            </motion.div>

            {/* Animated rings */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 1.8],
                transition: {
                  repeat: 2,
                  duration: 1.5,
                  ease: "easeInOut",
                },
              }}
            />

            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.4, 2],
                transition: {
                  repeat: 2,
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeInOut",
                },
              }}
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-1 bg-gray-800 rounded-full mt-8 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="text-cyan-400 mt-4 text-sm tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            LOADING
          </motion.p>

        
        </motion.div>
      )}
    </AnimatePresence>
  )
}
