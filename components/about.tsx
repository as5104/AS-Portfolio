"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ServiceCarousel from "./service-carousel"
import { Lightbulb, Target, Zap, Rocket, Heart, TrendingUp, GraduationCap, BookOpen } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
      className="group relative border border-cyan-500/20 rounded-xl p-4 sm:p-5 bg-black/40 backdrop-blur-sm hover:bg-cyan-500/5 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-200 ease-out"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-cyan-500/20 transition-colors duration-200">
        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
      </div>

      <span className="inline-block px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full mb-2">
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
        <motion.div style={{ y, opacity }} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 border border-cyan-500/20 rounded-lg p-0.5">
                <div className="bg-black/60 p-5 sm:p-6 lg:p-8 rounded-lg">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Who I Am</h3>
                  <p className="text-gray-300 mb-6">
                    I&apos;m software developer from West Bengal, India, currently pursuing Computer Science & Engineering at IIIT Guwahati. I design and build end-to-end web applications, balancing polished, user-first interfaces with reliable systems.
                  </p>
                  <p className="text-gray-300 mb-6">
                    My focus is clean, maintainable code, high performance, and delivering smooth, accessible user experiences that actually solve real problems.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      Development
                    </div>
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      UI/UX & Frontend
                    </div>
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      Performance & Deployment
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-12 lg:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-5 -right-5 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
            <div className="relative z-10 border border-cyan-500/20 rounded-xl p-4 sm:p-5 lg:p-6 bg-black/40 backdrop-blur-sm h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 rounded-lg">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </span>
                Core Strengths
              </h3>
              <div className="space-y-2.5">
                {coreStrengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyan-500/5 hover:translate-x-1 transition-all duration-200 ease-out cursor-default"
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
            <div className="relative z-10 border border-cyan-500/20 rounded-xl p-4 sm:p-5 lg:p-6 bg-black/40 backdrop-blur-sm h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 rounded-lg">
                  <Heart className="w-4 h-4 text-cyan-400" />
                </span>
                What Drives Me
              </h3>
              <div className="space-y-2.5">
                {whatDrivesMe.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyan-500/5 hover:-translate-x-1 transition-all duration-200 ease-out cursor-default"
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 sm:mt-12 lg:mt-14"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-cyan-400" />
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
        </motion.div>
      </div>
    </section>
  )
}
