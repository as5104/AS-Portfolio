"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import BackgroundAurora from "@/components/background-aurora"
import LoadingScreen from "@/components/loading-screen"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log("ClientLayout mounted, loading:", loading)
    setMounted(true)

    if (loading) {
      document.body.style.overflow = "hidden"
    }

    // Auto-finish loading after 3 seconds as fallback
    const timer = setTimeout(() => {
      console.log("Auto-finishing loading after 3 seconds")
      setLoading(false)
      document.body.style.overflow = ""
    }, 3000)

    return () => clearTimeout(timer)
  }, [loading])

  const handleFinishLoading = () => {
    console.log("handleFinishLoading called")
    setLoading(false)
    document.body.style.overflow = ""
  }

  if (!mounted) {
    console.log("Not mounted yet, returning null")
    return null
  }

  console.log("Rendering ClientLayout, loading:", loading, "mounted:", mounted)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
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
