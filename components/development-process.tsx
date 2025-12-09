"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
        <motion.div style={{ y, opacity }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Development Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A systematic approach to delivering high-quality solutions.</p>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Process Steps Flow */}
        <div className="relative mb-20">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="group relative h-full">
                  {/* Card with CSS-only hover effects */}
                  <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full overflow-hidden transition-all duration-200 ease-out hover:border-cyan-500/40 hover:bg-black/60 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    {/* Step Number Badge */}
                    <div className="relative flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/30">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-200">
                        <item.icon className="w-5 h-5 text-cyan-400" />
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
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-4 h-4 bg-black rounded-full border border-cyan-500/30">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-cyan-400"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/5 rounded-full filter blur-3xl"></div>

          <div className="relative z-10 border border-cyan-500/20 rounded-xl p-6 md:p-8 bg-black/40 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-center">Core Competencies</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {coreCompetencies.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 md:p-4 bg-black/30 border border-cyan-500/10 rounded-lg hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-default"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-200">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
