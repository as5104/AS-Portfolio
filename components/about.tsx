"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ServiceCarousel from "./service-carousel"

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

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div style={{ y, opacity }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 border border-cyan-500/20 rounded-lg p-1">
                <div className="bg-black/60 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                  <p className="text-gray-300 mb-6">
                    I&apos;m a frontend developer from Siliguri, India, currently pursuing Computer Science and Engineering at IIIT Guwahati. With a strong foundation in web technologies and a creative mindset, I specialize in crafting responsive, accessible, and interactive user interfaces.
                  </p>
                  <p className="text-gray-300 mb-6">
                    I'm passionate about building seamless digital experiences using modern JavaScript frameworks like React and Next.js, along with styling tools like Tailwind CSS. My work focuses on clean design, high performance, and smooth user interactions.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      React.js
                    </div>
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      Next.js
                    </div>
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      TypeScript
                    </div>
                    <div className="animated-tag bg-cyan-500/10 px-4 py-2 rounded-full text-cyan-400 text-sm">
                      Tailwind CSS
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
            className="h-[300px] md:h-[350px]"
          >
            <ServiceCarousel autoplay={true} autoplayDelay={3000} pauseOnHover={true} loop={true} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
