"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import ScrollButton from "./scroll-button"
import Orb from "./orb"
import RotatingText from "./rotating-text"
import SignatureName from "./signature-name"
import gsap from "gsap"
import { smoothScrollTo } from "./smooth-scroll-provider"


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const [resumeHovered, setResumeHovered] = useState(false)

  // GSAP scroll-driven exit animation
  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (text) {
        gsap.to(text, {
          yPercent: -30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleScrollTo = (target: string) => {
    smoothScrollTo(target, { offset: -80 })
  }

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Available for hire badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(0,229,255,0.12))",
                  border: "1px solid rgba(0,212,170,0.35)",
                  color: "#00d4aa",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "linear-gradient(135deg, #34d399, #00e5ff)" }}
                />
                Available for hire
              </motion.div>

              <div className="flex flex-col">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  Hello! I&apos;m
                </motion.h1>

                {/* SIGNATURE NAME using GSAP + opentype.js */}
                <SignatureName />

              </div>

              {/* Software Developer subheading */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="text-2xl md:text-2xl lg:text-3xl font-semibold tracking-wide"
                style={{
                  background: "linear-gradient(90deg, #34d399, #00e5ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Software Developer
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                A passionate developer specializing in creating responsive,
                interactive web experiences. Passionate about turning ideas
                into elegant digital experiences.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                {/* View Work */}
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScrollTo("#portfolio")
                  }}
                  className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
                >
                  <span
                    className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full rounded-full"
                    style={{ background: "linear-gradient(to right, #34d399, #00e5ff)" }}
                  />
                  <span className="relative flex items-center gap-2 group-hover:text-black transition-colors">
                    View Work <ArrowRight size={16} />
                  </span>
                </a>

                {/* Resume */}
                <a
                  href="/MyResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex rounded-full p-[2px] overflow-hidden"
                  onMouseEnter={() => setResumeHovered(true)}
                  onMouseLeave={() => setResumeHovered(false)}
                >
                  {/* Default white border bg */}
                  <span className="absolute inset-0 rounded-full bg-white/80" />
                  {/* Gradient sweep over border */}
                  <span
                    className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full rounded-full"
                    style={{ background: "linear-gradient(to right, #34d399, #00e5ff)" }}
                  />
                  {/* Inner glass content */}
                  <span
                    className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white"
                    style={{
                      background: "rgba(5, 10, 20, 0.85)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ scale: resumeHovered ? 1.12 : 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    >
                      {/* Document body - draws itself */}
                      <motion.path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
                        animate={{ pathLength: resumeHovered ? [0, 1] : 1 }}
                        transition={resumeHovered ? { duration: 0.5, ease: "easeInOut" } : { duration: 0.35 }}
                        style={{ pathLength: 1 }}
                      />
                      {/* Corner fold - peels in */}
                      <motion.path
                        d="M14 2v6h6"
                        animate={{
                          pathLength: resumeHovered ? [0, 1] : 1,
                          opacity: resumeHovered ? [0, 1] : 1,
                        }}
                        transition={resumeHovered ? { duration: 0.3, delay: 0.25, ease: "easeOut" } : { duration: 0.3 }}
                        style={{ pathLength: 1 }}
                      />
                      {/* Header line - short */}
                      <motion.line
                        x1="8" y1="9" x2="12" y2="9"
                        animate={{ pathLength: resumeHovered ? [0, 1] : 1, opacity: resumeHovered ? [0, 1] : 1 }}
                        transition={resumeHovered ? { duration: 0.2, delay: 0.38, ease: "easeOut" } : { duration: 0.2 }}
                        style={{ pathLength: 1 }}
                      />
                      {/* Text line 1 */}
                      <motion.line
                        x1="8" y1="13" x2="16" y2="13"
                        animate={{ pathLength: resumeHovered ? [0, 1] : 1, opacity: resumeHovered ? [0, 1] : 1 }}
                        transition={resumeHovered ? { duration: 0.25, delay: 0.46, ease: "easeOut" } : { duration: 0.2 }}
                        style={{ pathLength: 1 }}
                      />
                      {/* Text line 2 */}
                      <motion.line
                        x1="8" y1="17" x2="16" y2="17"
                        animate={{ pathLength: resumeHovered ? [0, 1] : 1, opacity: resumeHovered ? [0, 1] : 1 }}
                        transition={resumeHovered ? { duration: 0.25, delay: 0.54, ease: "easeOut" } : { duration: 0.2 }}
                        style={{ pathLength: 1 }}
                      />
                    </motion.svg>
                    Resume
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Orb */}
          <motion.div
            ref={orbRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full filter blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(16,185,129,0.06) 60%, transparent 70%)" }}
            />
            <div className="relative z-10 w-[400px] h-[400px] mx-auto">
              <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={30}
                forceHoverState={false}
                size="w-[400px] h-[400px]"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center designer-text z-20 pointer-events-none">
                <div className="text-6xl font-bold gradient-text">AS</div>
                <div className="mt-2">
                  <div className="cool-gradient-border inline-block">
                    <div className="cool-gradient-border-inner">
                      <RotatingText
                        texts={["Developer", "Designer", "Creator", "Innovator"]}
                        mainClassName="justify-center text-sm font-medium"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden"
                        elementLevelClassName="cool-gradient-text"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollButton targetId="about" />
    </section>
  )
}
