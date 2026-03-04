"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import {
  Lightbulb,
  Palette,
  Code2,
  Rocket,
  Layout,
  Smartphone,
  Gauge,
  Shield,
  GitBranch,
  Database,
  Cloud,
  Layers,
} from "lucide-react"

export default function DevelopmentProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const horizontalInnerRef = useRef<HTMLDivElement>(null)

  const [isDesktop, setIsDesktop] = useState(false)

  // Track viewport width for responsive behavior
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header parallax
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { yPercent: 20, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          }
        )
      }

      // Connection line "draws" itself on scroll
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        )
      }

      // Process step cards stagger in sequentially tied to scroll
      if (timelineRef.current) {
        const steps = timelineRef.current.querySelectorAll(".process-step")
        gsap.fromTo(
          steps,
          { y: 60, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1.2,
            },
          }
        )
      }

      // Horizontal scroll for Core Competencies — DESKTOP ONLY
      if (isDesktop) {
        const horizontalSection = horizontalRef.current
        const horizontalInner = horizontalInnerRef.current
        if (horizontalSection && horizontalInner) {
          const totalScrollWidth = horizontalInner.scrollWidth - horizontalSection.offsetWidth

          if (totalScrollWidth > 0) {
            gsap.to(horizontalInner, {
              x: -totalScrollWidth,
              ease: "none",
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top 20%",
                end: () => `+=${totalScrollWidth * 1.5}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
          }
        }
      }
    }, section)

    return () => ctx.revert()
  }, [isDesktop])

  const processSteps = [
    {
      step: 1,
      title: "Ideation & Planning",
      description: "Understanding requirements, research, and creating a strategic roadmap for the project.",
      icon: Lightbulb,
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "Crafting user interfaces, wireframes, and interactive prototypes for seamless UX.",
      icon: Palette,
    },
    {
      step: 3,
      title: "Development & Coding",
      description: "Building robust, scalable applications with clean, maintainable code architecture.",
      icon: Code2,
    },
    {
      step: 4,
      title: "Testing & Deployment",
      description: "Rigorous testing, optimization, and deploying the polished product to production.",
      icon: Rocket,
    },
  ]

  const coreCompetencies = [
    { name: "UI/UX Design", icon: Layout },
    { name: "Responsive Design", icon: Smartphone },
    { name: "Performance", icon: Gauge },
    { name: "Security", icon: Shield },
    { name: "Version Control", icon: GitBranch },
    { name: "Database", icon: Database },
    { name: "Cloud Services", icon: Cloud },
    { name: "Architecture", icon: Layers },
  ]

  return (
    <section id="process" ref={sectionRef} className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Development Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A systematic approach to delivering high-quality solutions.</p>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mt-4"></div>
        </div>

        {/* Process Steps Flow */}
        <div ref={timelineRef} className="relative mb-20">
          {/* Connection Line — draws on scroll */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0 origin-left"
            style={{ background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent)" }}
          ></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((item, index) => (
              <div key={index} className="process-step relative z-10">
                <div className="group relative h-full">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-6 h-full overflow-hidden transition-all duration-200 ease-out hover:border-emerald-500/40 hover:bg-black/60 hover:-translate-y-2 hover:shadow-lg hover:shadow-emerald-500/10">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    {/* Step Number Badge */}
                    <div className="relative flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold border border-emerald-500/30">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-200">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-cyan-50 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="relative text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-200">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow connector for desktop */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-4 h-4 bg-black rounded-full border border-emerald-500/30">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-emerald-400"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div ref={horizontalRef} className="relative overflow-hidden">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/5 rounded-full filter blur-3xl"></div>

          <div className="relative z-10 border border-emerald-500/20 rounded-3xl p-6 md:p-8 bg-black/40 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-center">Core Competencies</h3>

            {/* Desktop: horizontal scroll row */}
            <div
              ref={horizontalInnerRef}
              className="hidden md:flex gap-4 md:gap-5 will-change-transform"
            >
              {coreCompetencies.map((item, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 flex items-center gap-3 p-3 md:p-4 bg-black/30 border border-emerald-500/10 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-default"
                  style={{ minWidth: "180px" }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors duration-200">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: wrapped grid so all items are visible */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {coreCompetencies.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2.5 p-3 bg-black/30 border border-emerald-500/10 rounded-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200 ease-out cursor-default"
                >
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors duration-200">
                    <item.icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
