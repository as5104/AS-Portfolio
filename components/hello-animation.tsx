"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HelloAnimationProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelloAnimation({ isOpen, onClose }: HelloAnimationProps) {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
        setTimeout(() => {
          onClose()
          setAnimationComplete(false)
        }, 500)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center bg-black/90 p-8 rounded-xl backdrop-blur-md border border-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.2)] max-w-md w-[90%]"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div className="flex items-center gap-4">
              <motion.div
                className="text-6xl md:text-7xl"
                initial={{ opacity: 0, x: -20, rotate: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
                whileInView={{
                  rotate: [0, 15, 0, 15, 0],
                  transition: {
                    delay: 0.7,
                    duration: 1.5,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 0.6, 1],
                  },
                }}
              >
                👋
              </motion.div>

              <motion.div
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="gradient-text">HELLO!</span>
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-6 text-base md:text-lg text-white text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Welcome to my portfolio. I'm excited to share my work with you!
            </motion.p>

            <motion.button
              className="mt-6 px-5 py-2 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              Explore Portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
