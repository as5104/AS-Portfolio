"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Code, Layout, Lightbulb } from "lucide-react"
import type { JSX } from "react"

export interface ServiceItem {
  title: string
  description: string
  id: number
  icon: JSX.Element
}

export interface ServiceCarouselProps {
  items?: ServiceItem[]
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
}

export default function ServiceCarousel({
  items,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}: ServiceCarouselProps): JSX.Element {
  const DEFAULT_ITEMS: ServiceItem[] = [
    {
      title: "Frontend Development",
      description: "Building responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.",
      id: 1,
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Web Performance",
      description: "Optimizing websites for speed, accessibility, and SEO to deliver exceptional user experiences.",
      id: 2,
      icon: <Code className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Creative Solutions",
      description: "Solving complex UI challenges with innovative approaches and clean, maintainable code.",
      id: 3,
      icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
    },
  ]

  const serviceItems = items || DEFAULT_ITEMS
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle hover state
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [pauseOnHover])

  // Handle autoplay
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === serviceItems.length - 1) {
            return loop ? 0 : prev
          }
          return prev + 1
        })
      }, autoplayDelay)
      return () => clearInterval(timer)
    }
  }, [autoplay, autoplayDelay, isHovered, loop, serviceItems.length, pauseOnHover])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection

    if (newIndex < 0) {
      setCurrentIndex(loop ? serviceItems.length - 1 : 0)
    } else if (newIndex >= serviceItems.length) {
      setCurrentIndex(loop ? 0 : serviceItems.length - 1)
    } else {
      setCurrentIndex(newIndex)
    }

    setPage([page + newDirection, newDirection])
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full flex flex-col items-center justify-center p-6"
        >
          <div className="service-card bg-gradient-to-r from-black to-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-all w-full max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-500/10 p-3 rounded-lg">{serviceItems[currentIndex].icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{serviceItems[currentIndex].title}</h3>
                <p className="text-gray-400">{serviceItems[currentIndex].description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-cyan-500/20 transition-colors z-10"
        onClick={() => paginate(-1)}
        aria-label="Previous service"
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-cyan-500/20 transition-colors z-10"
        onClick={() => paginate(1)}
        aria-label="Next service"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {serviceItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-cyan-400" : "bg-gray-600"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setPage([index, index > currentIndex ? 1 : -1])
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
