"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Palette, Zap, Wrench } from "lucide-react"

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      color: "bg-cyan-500",
      hoverBg: "hover:bg-cyan-500/10",
      hoverBorder: "hover:border-cyan-500/40",
      skills: ["Python", "C", "C++", "Java"],
    },
    {
      title: "Frontend",
      icon: Palette,
      color: "bg-purple-500",
      hoverBg: "hover:bg-purple-500/10",
      hoverBorder: "hover:border-purple-500/40",
      skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      title: "Standards",
      icon: Zap,
      color: "bg-rose-500",
      hoverBg: "hover:bg-rose-500/10",
      hoverBorder: "hover:border-rose-500/40",
      skills: ["Web Accessibility", "SEO Optimization", "Performance", "Clean Code", "Agile/Scrum", "Testing"],
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      color: "bg-orange-500",
      hoverBg: "hover:bg-orange-500/10",
      hoverBorder: "hover:border-orange-500/40",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Docker", "Vercel"],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div style={{ y, opacity }} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Skills & <span className="text-cyan-400">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive toolkit for building modern, scalable applications.
          </p>
          <div className="w-16 sm:w-20 h-1 bg-cyan-400 mx-auto mt-3"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 ${category.hoverBg} ${category.hoverBorder} hover:-translate-y-1 transition-all duration-200 ease-out`}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 ${category.color} rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                >
                  <category.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <span className={`w-1.5 h-1.5 rounded-full ${category.color} flex-shrink-0`}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
