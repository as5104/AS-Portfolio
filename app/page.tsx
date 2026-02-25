import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import DevelopmentProcess from "@/components/development-process"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CursorEffect from "@/components/cursor-effect"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CursorEffect />
      <Hero />
      <About />
      <Skills />
      <DevelopmentProcess />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}