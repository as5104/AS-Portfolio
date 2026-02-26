"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Mail, MapPin, Phone, Send, Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import SuccessModal from "./success-modal"

//Rate Limit Config
const RATE_LIMIT_KEY = "as_portfolio_rl"
const MAX_SENDS = 3
const WINDOW_DAYS = 3
const WINDOW_MS = WINDOW_DAYS * 24 * 60 * 60 * 1000

function getRateLimitData(): Record<string, number[]> {
  try { return JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "{}") }
  catch { return {} }
}

function saveRateLimitData(data: Record<string, number[]>) {
  try { localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data)) }
  catch { /* storage full — fail silently */ }
}

function checkRateLimit(email: string): { allowed: boolean; daysLeft?: number; recent: number[] } {
  const key = email.toLowerCase().trim()
  const now = Date.now()
  const data = getRateLimitData()
  const recent = (data[key] || []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_SENDS) {
    const oldest = Math.min(...recent)
    const daysLeft = Math.ceil((oldest + WINDOW_MS - now) / (1000 * 60 * 60 * 24))
    return { allowed: false, daysLeft, recent }
  }
  return { allowed: true, recent }
}

/** RECORD — call only after a successful send */
function recordSend(email: string, recent: number[]) {
  const key = email.toLowerCase().trim()
  const data = getRateLimitData()
  data[key] = [...recent, Date.now()]
  saveRateLimitData(data)
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submittedName, setSubmittedName] = useState("")
  const [rateLimitError, setRateLimitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //prevent rapid double-submit
    if (isSubmitting) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields.")
      return
    }

    // Rate limit check
    const limit = checkRateLimit(formData.email)
    if (!limit.allowed) {
      const msg = `You've reached the limit. Try again in ${limit.daysLeft} day${limit.daysLeft === 1 ? "" : "s"}.`
      setRateLimitError(msg)
      setTimeout(() => setRateLimitError(null), 6000)
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.")
        return
      }

      setSubmittedName(formData.name)
      // Record the send only after confirmed success
      recordSend(formData.email, limit.recent)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setShowModal(true)
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => setShowModal(false)

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-cyan-400" />,
      title: "Email",
      details: "sarkarankit123456@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      title: "Phone",
      details: "+91 9614161186",
    },
    {
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      title: "Location",
      details: "Siliguri, India",
    },
  ]

  return (
    <>
      <SuccessModal isOpen={showModal} onClose={handleCloseModal} name={submittedName} />
      <section id="contact" ref={sectionRef} className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-cyan-950/5 to-black/0 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div style={{ y, opacity }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind? Let's talk about it.</p>
            <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out if you want to collaborate with me, or simply have a chat.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="contact-item-animated flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 rounded-full"
                      whileHover={{
                        backgroundColor: "rgba(0, 255, 255, 0.2)",
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-gray-400">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/-ankitsarkar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-cyan-500/20"
                    whileHover={{ y: -5, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    href="#"
                    className="social-icon w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-cyan-500/20"
                    whileHover={{ y: -5, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Instagram Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </motion.a>

                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/as5104"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-cyan-500/20"
                    whileHover={{ y: -5, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub Profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      maxLength={200}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={5000}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                    ></textarea>
                  </div>

                  {/* Rate limit inline error */}
                  <AnimatePresence>
                    {rateLimitError && (
                      <motion.div
                        key="rl-error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/25 text-sm text-red-400"
                      >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{rateLimitError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-2xl hover:bg-cyan-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 5px 15px rgba(0, 255, 255, 0.3)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
