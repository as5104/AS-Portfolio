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


  useEffect(() => {
    setMounted(true)


    if (loading) {
      document.body.style.overflow = "hidden"
    }

    const fallbackTimer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(fallbackTimer)
  }, [loading])

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
