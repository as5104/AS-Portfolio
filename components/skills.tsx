"use client"

import { useRef, useEffect } from "react"
import { Code2, Palette, Zap, Wrench } from "lucide-react"
import gsap from "gsap"

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      // Cards stagger in from bottom with slight scale
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(":scope > div")
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1.2,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      color: "bg-emerald-500",
      hoverBg: "hover:bg-emerald-500/10",
      hoverBorder: "hover:border-emerald-500/40",
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
        <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Skills & <span className="text-emerald-400">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A comprehensive toolkit for building modern, scalable applications.
          </p>
          <div className="w-16 sm:w-20 h-1 bg-emerald-400 mx-auto mt-3"></div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-5 ${category.hoverBg} ${category.hoverBorder} hover:-translate-y-1 transition-all duration-200 ease-out`}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 ${category.color} rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
