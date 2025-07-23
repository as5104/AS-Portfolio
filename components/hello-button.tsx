"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import HelloAnimation from "./hello-animation"

export default function HelloButton() {
  const [showAnimation, setShowAnimation] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setShowAnimation(true)
  }

  const handleClose = () => {
    setShowAnimation(false)
  }

  return (
    <>
      <motion.button
        className="hello-button relative overflow-hidden font-bold text-2xl md:text-3xl px-6 py-2 rounded-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Hello!</span>

        {/* Background layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-cyan-400/10 rounded-full"
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            x: isHovered ? "0%" : "-50%",
            y: isHovered ? "0%" : "-50%",
          }}
          transition={{ duration: 0.5 }}
          style={{
            originX: 0,
            originY: 0,
          }}
        />

        <motion.div
          className="absolute bottom-0 right-0 w-full h-full bg-cyan-400/10 rounded-full"
          initial={{ scale: 0, x: "50%", y: "50%" }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            x: isHovered ? "0%" : "50%",
            y: isHovered ? "0%" : "50%",
          }}
          transition={{ duration: 0.5 }}
          style={{
            originX: 1,
            originY: 1,
          }}
        />


        {/* Border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
            borderColor: isHovered ? "rgba(0, 255, 255, 0.5)" : "rgba(0, 255, 255, 0.3)",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />
      </motion.button>

      <HelloAnimation isOpen={showAnimation} onClose={handleClose} />
    </>
  )
}
