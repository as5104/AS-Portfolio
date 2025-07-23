"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Skills() {
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

  const skills = [
    {
      name: "React.js",
      level: 90,
      icon: "R",
    },
    {
      name: "JavaScript",
      level: 95,
      icon: "JS",
    },
    {
      name: "HTML & CSS",
      level: 95,
      icon: "</>",
    },
    {
      name: "Next.js",
      level: 85,
      icon: "N",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: "T",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: "TS",
    },
  ]

  const education = [
    {
      degree: "BTech, Computer Science and Engineering",
      institution: "IIIT Guwahati",
      year: "2023 - 2027",
    },
    // {
    //   degree: " ",
    //   institution: " ",
    //   year: " ",
    // },
    // {
    //   degree: " ",
    //   institution: " ",
    //   year: " ",
    // },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div style={{ y, opacity }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Education</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">For those who know what they're looking for.</p>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="skill-item"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 text-cyan-400 rounded-lg font-mono">
                      {skill.icon}
                    </div>
                    <h4 className="font-medium">{skill.name}</h4>
                    <div className="ml-auto text-sm text-cyan-400">{skill.level}%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: false, margin: "-10% 0px" }}
                      transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-cyan-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-2">Education</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="relative pl-8 border-l border-gray-800"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1.5"></div>
                  <h4 className="text-xl font-bold">{item.degree}</h4>
                  <p className="text-gray-400">{item.institution}</p>
                  <p className="text-sm text-cyan-400 mt-1">{item.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
