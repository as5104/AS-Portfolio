"use client"

import { ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-black border-t border-gray-800 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="#home" className="text-2xl font-bold gradient-text">
              AS
            </a>
            <p className="text-gray-400 mt-4 max-w-md">
              Frontend developer focused on building sleek, responsive, and high-impact web experiences with modern frameworks.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-cyan-400 transition-colors nav-link inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("home")
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-cyan-400 transition-colors nav-link inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("about")
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-cyan-400 transition-colors nav-link inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("skills")
                  }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-cyan-400 transition-colors nav-link inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("portfolio")
                  }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-cyan-400 transition-colors nav-link inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact")
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="contact-item flex items-center gap-2 text-gray-400">
                <span className="text-cyan-400">Email:</span> sarkarankit123456@gmail.com
              </li>
              <li className="contact-item flex items-center gap-2 text-gray-400">
                <span className="text-cyan-400">Phone:</span> +91 9614161186
              </li>
              <li className="contact-item flex items-center gap-2 text-gray-400">
                <span className="text-cyan-400">Location:</span> Siliguri, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Ankit Sarkar. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            className="animated-button mt-4 md:mt-0 w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-all"
            aria-label="Scroll to top"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
