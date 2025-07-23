"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import ScrollButton from "./scroll-button"
import HelloButton from "./hello-button"
import Orb from "./orb"
import RotatingText from "./rotating-text"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullName = "Ankit Sarkar"

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setTypedText(fullName.substring(0, currentIndex))
        currentIndex++
      } else {
        setTimeout(() => {
          currentIndex = 0
          setTypedText("")
        }, 2000)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          } else {
            entry.target.classList.remove("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    const elements = document.querySelectorAll(".animate-fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const descriptionText =
    "A passionate frontend developer specializing in creating responsive, interactive web experiences. Passionate about turning ideas into elegant digital experiences."

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <HelloButton />
              </div>

              <div className="space-y-1">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  I&apos;m
                </motion.h2>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold typing-container"
                >
                  <span className="typing-text gradient-text">{typedText}</span>
                  <span className="typing-cursor">|</span>
                </motion.h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold leading-tight text-gray-300">
                <span className="letter-hover">Frontend_</span>
                <span className="letter-hover">Developer</span>
              </h3>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-gray-300 text-lg max-w-xl"
              >
                {descriptionText}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
                <a
                  href="#contact"
                  className="animated-button inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Get in touch <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>


            {/* WebGL Orb */}
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
