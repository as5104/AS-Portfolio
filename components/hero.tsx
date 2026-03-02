"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import ScrollButton from "./scroll-button"
import Orb from "./orb"
import RotatingText from "./rotating-text"
import SignatureName from "./signature-name"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div>
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
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
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

                {/* Contact Me */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:border-[#00d4aa]/50 hover:text-[#00d4aa] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,212,170,0.2)]"
                >
                  Contact Me
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Orb */}
          <motion.div
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
