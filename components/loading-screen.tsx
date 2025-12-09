"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  finishLoading: () => void
}

export default function LoadingScreen({ finishLoading }: LoadingScreenProps) {
  useEffect(() => {
    if (typeof finishLoading !== "function") {
      console.error("finishLoading is not a function:", finishLoading)
      return
    }

    const timeout = setTimeout(() => {
      finishLoading()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [finishLoading])

  return (
    <>
      <motion.div
        key="loader"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        initial={false}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
        aria-live="polite"
        role="status"
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >

          <div className="loader" />


          <motion.h1
            className="full-name"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
          >
            Ankit Sarkar
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45, ease: "easeOut" }}
          >
            Loading portfolio
          </motion.p>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nexa:wght@400;700;900&display=swap");

        .loader {
          width: fit-content;
          font-size: 5rem;
          line-height: 1.2;
          font-family: "Nexa", sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0000;
          -webkit-text-stroke: 0.5px white;
          background:
            radial-gradient(1.13em at 50% 1.6em, white 99%, #0000 101%)
              calc(50% - 1.6em) 0 / 3.2em 100% text,
            radial-gradient(1.13em at 50% -0.8em, #0000 99%, white 101%) 50%
              0.8em / 3.2em 100% repeat-x text;
          -webkit-background-clip: text;
          background-clip: text;
          animation: loader-bounce 2.5s linear infinite;
        }

        .loader::before {
          content: "AS";
        }

        @keyframes loader-bounce {
          to {
            background-position:
              calc(50% + 1.6em) 0,
              calc(50% + 3.2em) 0.8em;
          }
        }

        .full-name {
          margin-top: 2.4rem;
          margin-bottom: 0.25rem;
          font-family: "Nexa", sans-serif;
          font-weight: 900;
          font-size: 3.25rem;
          color: #bdbdbd;
          text-transform: none;
          letter-spacing: 0.02em;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          transform-origin: center;
        }

        .subtitle {
          margin: 0;
          margin-top: 0.25rem;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.18);
          text-transform: uppercase;
          letter-spacing: 0.28em;
        }

        @media (max-width: 640px) {
          .loader {
            font-size: 3.6rem;
          }
          .full-name {
            font-size: 2rem;
            margin-top: 1.6rem;
          }
          .subtitle {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  )
}
