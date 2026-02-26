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
        className="fixed top-0 left-0 w-full z-40 hidden md:block transition-all duration-500 pt-3"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500",
              scrolled
                ? "bg-black/50 backdrop-blur-2xl border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]"
                : "bg-black/25 backdrop-blur-xl border border-white/[0.07] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            )}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-lg lg:text-xl font-bold shrink-0"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
            >
              <span className="gradient-text">AS</span>
            </a>

            {/* Nav Links */}
            <nav className="flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className={cn(
                      "group relative px-2.5 py-1 text-[12px] lg:text-[13px] font-normal transition-all duration-250",
                      isActive
                        ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                        : "text-white/60 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]"
                    )}
                  >
                    <span>{link.name}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-cyan-400",
                        "transition-all duration-300 ease-out",
                        isActive
                          ? "w-4/5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-70"
                      )}
                    />
                  </a>
                )
              })}
            </nav>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#contact")
              }}
              className={cn(
                "shrink-0 px-4 py-1.5 rounded-full text-[12px] lg:text-[13px] font-medium transition-all duration-300",
                "bg-cyan-500/10 border border-cyan-500/35 text-cyan-400",
                "hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]",
                "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
              )}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE TOP BAR */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 md:hidden transition-all duration-500",
          scrolled ? "pt-2" : "pt-3"
        )}
      >
        <div className="px-3">
          <div
            className={cn(
              "flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500",
              scrolled
                ? "bg-black/50 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                : "bg-black/20 backdrop-blur-md border border-white/[0.05]"
            )}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#home")
              }}
            >
              <span className="gradient-text">AS</span>
            </a>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#contact")
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                "bg-cyan-500/10 border border-cyan-500/35 text-cyan-400",
                "hover:bg-cyan-500/20 hover:border-cyan-400/60",
                "active:scale-95"
              )}
            >
              Let&apos;s Talk
            </a>
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