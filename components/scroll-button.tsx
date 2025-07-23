"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

interface ScrollButtonProps {
  targetId: string
}

export default function ScrollButton({ targetId }: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const bounceAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <motion.button
        onClick={scrollToSection}
        className="animated-button w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center border border-cyan-500/30 hover:bg-cyan-500/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={bounceAnimation}
        aria-label={`Scroll to ${targetId} section`}
      >
        <ChevronDown size={24} />
      </motion.button>
    </div>
  )
}
