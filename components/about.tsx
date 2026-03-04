"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ServiceCarousel from "./service-carousel"
import { Lightbulb, Target, Zap, Rocket, Heart, TrendingUp, GraduationCap, BookOpen } from "lucide-react"
import gsap from "gsap"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  // GSAP scroll-driven animations
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

      // Stagger the "Core Strengths" and "What Drives Me" cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(":scope > div")
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 1.2,
            },
          }
        )
      }

      // Education section
      if (educationRef.current) {
        gsap.fromTo(
          educationRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: educationRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const coreStrengths = [
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Breaking down complex challenges into elegant, efficient solutions.",
    },
    {
      icon: Target,
      title: "Attention to Detail",
      description: "Pixel-perfect implementation with focus on quality and precision.",
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quickly adapting to new technologies and development practices.",
    },
  ]

  const whatDrivesMe = [
    {
      icon: Rocket,
      title: "Innovation",
      description: "Exploring cutting-edge technologies to build modern solutions.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Deep love for creating beautiful and functional web experiences.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Constantly learning, improving, and pushing myself to master new tools and technologies.",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Technology",
      institution: "IIIT Guwahati",
      year: "2023 - 2027",
      description: "Computer Science and Engineering",
      icon: GraduationCap,
    },
  ]

  const renderEducationCard = (item: typeof education[number], index: number) => (
    <div
      key={index}
      className="group relative border border-emerald-500/20 rounded-3xl p-4 sm:p-5 bg-black/40 backdrop-blur-sm hover:bg-emerald-500/5 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-200 ease-out"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-emerald-500/20 transition-colors duration-200">
        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
      </div>

      <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full mb-2">
        {item.year}
      </span>

      <h4 className="text-sm sm:text-base font-bold text-white mb-1">{item.degree}</h4>
      <p className="text-gray-400 text-xs sm:text-sm mb-2">{item.institution}</p>
      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
    </div>
  )

  return (
    <section id="about" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <div className="w-16 h-1 bg-emerald-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 border border-emerald-500/20 rounded-3xl p-0.5">
                <div className="bg-black/60 p-5 sm:p-6 lg:p-8 rounded-[22px]">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Who I Am</h3>
                  <p className="text-gray-300 mb-6">
                    I&apos;m software developer from West Bengal, India, currently pursuing Computer Science &amp; Engineering at IIIT Guwahati. I design and build end-to-end web applications, balancing polished, user-first interfaces with reliable systems.
                  </p>
                  <p className="text-gray-300 mb-6">
                    My focus is clean, maintainable code, high performance, and delivering smooth, accessible user experiences that actually solve real problems.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="animated-tag bg-emerald-500/10 px-4 py-2 rounded-full text-emerald-400 text-sm">
                      Development
                    </div>
                    <div className="animated-tag bg-emerald-500/10 px-4 py-2 rounded-full text-emerald-400 text-sm">
                      UI/UX &amp; Frontend
                    </div>
                    <div className="animated-tag bg-emerald-500/10 px-4 py-2 rounded-full text-emerald-400 text-sm">
                      Performance &amp; Deployment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-[250px] sm:h-[280px] md:h-[320px]"
          >
            <ServiceCarousel autoplay={true} autoplayDelay={3000} pauseOnHover={true} loop={true} />
          </motion.div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-12 lg:mt-14">
          <div className="relative">
            <div className="absolute -top-5 -right-5 w-48 h-48 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
            <div className="relative z-10 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 lg:p-6 bg-black/40 backdrop-blur-sm h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-xl">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </span>
                Core Strengths
              </h3>
              <div className="space-y-2.5">
                {coreStrengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-emerald-500/5 hover:translate-x-1 transition-all duration-200 ease-out cursor-default"
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <item.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
            <div className="relative z-10 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 lg:p-6 bg-black/40 backdrop-blur-sm h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-xl">
                  <Heart className="w-4 h-4 text-emerald-400" />
                </span>
                What Drives Me
              </h3>
              <div className="space-y-2.5">
                {whatDrivesMe.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-emerald-500/5 hover:-translate-x-1 transition-all duration-200 ease-out cursor-default"
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <item.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={educationRef} className="mt-10 sm:mt-12 lg:mt-14">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-xl">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </span>
              Education
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">My academic background</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {education.length === 1 ? (
              <div className="flex justify-center px-4">
                <div className="w-full max-w-md">{renderEducationCard(education[0], 0)}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {education.map(renderEducationCard)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
