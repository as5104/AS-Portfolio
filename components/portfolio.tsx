"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import gsap from "gsap"
import { getLenis } from "./smooth-scroll-provider"

/* Project Data */
const projects = [
  {
    title: "Personal Portfolio",
    description:
      "Modern, responsive portfolio website built with Next.js, featuring interactive animations, WebGL effects, and a sleek dark theme design.",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "WebGL", "Tailwind CSS"],
    image: "/placeholder1.png?height=600&width=800",
    mobileImage: "/placeholder5.png",
    githubLink: "https://github.com/as5104/AS-Portfolio",
    liveLink: "#",
  },
  {
    title: "AgriConnect",
    description:
      "Agricultural platform connecting farmers with buyers and providing market insights.",
    tags: ["Next.js", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/placeholder2.png?height=600&width=800",
    githubLink: "https://github.com/as5104/AgriConnect",
  },
  {
    title: "Pig Dice Game",
    description:
      "Interactive dice game with modern UI design and engaging gameplay mechanics.",
    tags: ["TypeScript", "React", "Vite", "Framer Motion", "Tailwind CSS"],
    image: "/placeholder3.png?height=600&width=800",
    githubLink: "https://github.com/as5104/Pig-Dice-Game-with-Ui",
    liveLink: "https://as5104.github.io/Pig-Dice-Game-with-Ui/",
  },
  {
    title: "Math Challenge",
    description:
      "Fun math game with various difficulty levels and a score system.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    image: "/placeholder4.png?height=600&width=800",
    githubLink: "https://github.com/as5104/Math-Challenge-with-ui",
  },
]

/* Main Portfolio Section */
export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileOverlay, setMobileOverlay] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Track viewport for responsive card shape
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Lock / unlock Lenis scroll when mobile overlay opens/closes
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    if (mobileOverlay !== null) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [mobileOverlay])

  useEffect(() => {
    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    const cardsContainer = cardsContainerRef.current
    if (!section || !pinWrapper || !cardsContainer) return

    const cards = cardsContainer.querySelectorAll<HTMLElement>(".project-card")
    const numCards = cards.length

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: i + 1,
            y: i === 0 ? 0 : window.innerHeight + 100,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top top",
            end: () => `+=${(numCards - 1) * window.innerHeight + window.innerHeight * 0.3}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const step = 1 / numCards
              const idx = Math.min(numCards - 1, Math.floor(self.progress / step))
              setActiveIndex(idx)
            },
          },
        })

        for (let i = 1; i < numCards; i++) {
          for (let j = 0; j < i; j++) {
            const scaleValue = 1 - (i - j) * 0.05
            tl.to(
              cards[j],
              {
                scale: scaleValue,
                y: -(i - j) * 15,
                duration: 1,
                ease: "power2.inOut",
              },
              i - 1
            )
          }

          tl.to(
            cards[i],
            {
              y: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            i - 1
          )
        }

        tl.to({}, { duration: 0.2 })
      }, section)

        ; (section as any).__gsapCtx = ctx
    }, 100)

    return () => {
      clearTimeout(timer)
      const ctx = (section as any)?.__gsapCtx
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative">
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none" />

        <div className="h-full lg:flex container mx-auto px-4 md:px-6">
          {/* LEFT: Description panel (desktop only) */}
          <div className="hidden lg:flex lg:w-[38%] items-center">
            <div className="w-full lg:pr-8 xl:pr-14">
              <h2 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                Portfolio
                <span className="block mt-1">
                  &amp;{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #34d399, #00e5ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Projects
                  </span>
                </span>
              </h2>
              <div className="w-16 h-1 bg-cyan-400 rounded-full mb-8" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {projects[activeIndex].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm">
                    {projects[activeIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[activeIndex].tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2.5 py-1 bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {projects[activeIndex].liveLink && (
                      <a
                        href={projects[activeIndex].liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors text-sm"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    <a
                      href={projects[activeIndex].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 text-white border border-gray-700 hover:bg-gray-700/50 transition-colors text-sm"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Cards area */}
          <div className="w-full lg:w-[62%] h-full flex flex-col items-center justify-center relative">
            {/* Mobile title */}
            <div className="lg:hidden absolute top-8 sm:top-10 left-0 right-0 text-center z-10 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Portfolio &amp;{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #34d399, #00e5ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Projects
                </span>
              </h2>
              <p className="text-gray-500 text-xs mt-2">Scroll to browse • Tap for details</p>
            </div>

            {/* Card stack container — portrait on mobile, landscape on desktop */}
            <div
              ref={cardsContainerRef}
              className="relative w-full"
              style={{
                maxWidth: isMobile ? "min(340px, 75vw)" : "700px",
                aspectRatio: isMobile ? "9 / 14" : "16 / 10",
                maxHeight: isMobile ? "min(520px, 70vh)" : "min(420px, 65vh)",
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 cursor-pointer will-change-transform origin-top"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setMobileOverlay(i)
                    }
                  }}
                >
                  <img
                    src={(isMobile && project.mobileImage) ? project.mobileImage : (project.image || "/placeholder.svg")}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === activeIndex
                        ? "rgb(52, 211, 153)"
                        : "rgba(255,255,255,0.2)",
                    transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Center glassmorphism popup */}
      <AnimatePresence>
        {mobileOverlay !== null && (
          <motion.div
            className="lg:hidden fixed inset-0 z-[60] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOverlay(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* popup card */}
            <motion.div
              className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/10"
              style={{
                background: "rgba(10, 20, 35, 0.45)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 40px rgba(0, 229, 255, 0.06), 0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={projects[mobileOverlay].image || "/placeholder.svg"}
                  alt={projects[mobileOverlay].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setMobileOverlay(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">
                  {projects[mobileOverlay].title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {projects[mobileOverlay].description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {projects[mobileOverlay].tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2 py-0.5 bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2.5">
                  {projects[mobileOverlay].liveLink && (
                    <a
                      href={projects[mobileOverlay].liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  <a
                    href={projects[mobileOverlay].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <Github size={14} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
