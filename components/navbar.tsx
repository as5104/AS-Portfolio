"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Home, User, Code2, Layers, Briefcase, Mail } from "lucide-react"

const navLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Process", href: "#process", icon: Layers },
  { name: "Projects", href: "#portfolio", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollY = window.scrollY + 120

      sections.forEach((section) => {
        const el = section as HTMLElement
        const top = el.offsetTop
        const height = el.offsetHeight
        const id = el.getAttribute("id") || ""

        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(id)
        }
      })

      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.replace("#", ""))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* DESKTOP TOP NAVBAR */}
      <header
        className={cn(
          "navbar-shell fixed top-0 left-0 w-full z-40 transition-all duration-300 pt-4 pb-3 sm:pt-6 sm:pb-4",
          scrolled
            ? "bg-black/35 backdrop-blur-xl shadow-lg shadow-black/30"
            : "bg-transparent backdrop-blur-0 shadow-none"
        )}
      >
        <div className="max-w-[1420px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-bold"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
            >
              <span className="gradient-text">AS</span>
            </a>

            <nav className="hidden md:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className={cn(
                    "nav-link text-sm lg:text-[14px] font-normal transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-cyan-400"
                      : "text-white hover:text-cyan-400"
                  )}
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("#contact")
                }}
                className="px-5 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-sm lg:text-[15px]"
              >
                Let&apos;s Talk
              </a>
            </nav>

            <div className="md:hidden" />
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVBAR */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
      >
        <div className="px-3 pb-2">
          <div className="max-w-[980px] mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-black/30 px-2 py-2">
            <div className="flex items-center justify-around">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.href.replace("#", "")

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "text-cyan-400 bg-cyan-500/15"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        isActive && "scale-110"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[10px] mt-1 font-medium",
                        isActive ? "opacity-100" : "opacity-70"
                      )}
                    >
                      {link.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}