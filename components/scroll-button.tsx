"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { smoothScrollTo } from "./smooth-scroll-provider"

interface ScrollButtonProps {
  targetId: string
}

export default function ScrollButton({ targetId }: ScrollButtonProps) {
  const scrollToSection = () => {
    smoothScrollTo(`#${targetId}`, { offset: -80 })
  }


  const bounceAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut" as const,
    },
  }

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <motion.button
        onClick={scrollToSection}
        className="animated-button w-12 h-12 rounded-full flex items-center justify-center border border-[#00d4aa]/30 hover:border-[#00d4aa]/60 text-[#00d4aa]"
        style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(0,229,255,0.1))" }}
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
