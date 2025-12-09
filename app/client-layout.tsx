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

  
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ""
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [loading])

  const handleFinishLoading = () => {
    setLoading(false)
    document.body.style.overflow = ""
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" finishLoading={handleFinishLoading} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full relative min-h-screen overflow-x-hidden"
          >
            <BackgroundAurora />
            <main className="relative z-10 pb-[88px] md:pb-0">
              {children}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
