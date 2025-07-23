"use client"

import type React from "react"
import { useState, useEffect } from "react"
import BackgroundAurora from "@/components/background-aurora"
import LoadingScreen from "@/components/loading-screen"
import { AnimatePresence, motion } from "framer-motion"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle initial mounting
  useEffect(() => {
    setMounted(true)

    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden"
    }

    // Fallback to ensure loading always completes
    const fallbackTimer = setTimeout(() => {
      setLoading(false)
    }, 5000) // 5 seconds max loading time

    return () => clearTimeout(fallbackTimer)
  }, [loading])

  // Function to finish loading
  const handleFinishLoading = () => {
    setLoading(false)
    document.body.style.overflow = ""
  }

  if (!mounted) return null

  return (
    <>
      {loading && <LoadingScreen finishLoading={handleFinishLoading} />}

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full"
          >
            <BackgroundAurora />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
