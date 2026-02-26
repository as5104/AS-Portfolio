"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export default function Portfolio() {
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

  const projects = [
    {
      title: "Personal Portfolio",
      description: "Modern, responsive portfolio website built with Next.js, featuring interactive animations, WebGL effects, and a sleek dark theme design.",
      tags: ["Next.js", "React", "TypeScript", "Framer Motion", "WebGL", "Tailwind CSS"],
      image: "/placeholder1.png?height=600&width=800",
      githubLink: "https://github.com/as5104/AS-Portfolio",
      liveLink: "#",
    },
    {
      title: "AgriConnect",
      description: "Agricultural platform connecting farmers with buyers and providing market insights.",
      tags: ["Next.js", "TypeScript", "Vite", "Tailwind CSS"],
      image: "/placeholder2.png?height=600&width=800",
      githubLink: "https://github.com/as5104/AgriConnect",
      // liveLink: "#",
    },
    {
      title: "Pig Dice Game",
      description: "Interactive dice game with modern UI design and engaging gameplay mechanics.",
      tags: ["TypeScript", "React", "Vite", "Framer Motion", "Tailwind CSS"],
      image: "/placeholder3.png?height=600&width=800",
      githubLink: "https://github.com/as5104/Pig-Dice-Game-with-Ui",
      liveLink: "https://as5104.github.io/Pig-Dice-Game-with-Ui/",
    },
    {
      title: "Math Challenge",
      description: "Fun math game with various difficulty levels and a score system.",
      tags: ["React", "JavaScript", "Tailwind CSS"],
      image: "/placeholder4.png?height=600&width=800",
      githubLink: "https://github.com/as5104/Math-Challenge-with-ui",
      // liveLink: "#",
    },
  ]

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div style={{ y, opacity }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio &amp; Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Latest projects</p>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="portfolio-item group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animated-button p-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animated-button p-2 rounded-full bg-gray-800/50 text-white border border-gray-700 hover:bg-gray-700/50"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
