"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface SuccessModalProps {
    isOpen: boolean
    onClose: () => void
    name?: string
}

export default function SuccessModal({ isOpen, onClose, name }: SuccessModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    const firstName = name ? name.trim().split(" ")[0] : ""

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto w-full max-w-sm"
                        >
                            <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">

                                {/* Top cyan accent line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:text-white hover:bg-white/8 transition-all duration-150"
                                    aria-label="Close"
                                >
                                    <X size={15} />
                                </button>

                                <div className="p-8 pt-9 text-center">
                                    {/* Check icon */}
                                    <motion.div
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="mx-auto mb-5 w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center"
                                    >
                                        {/* Animated checkmark SVG */}
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            className="text-cyan-400"
                                        >
                                            <motion.path
                                                d="M5 13.5L10.5 19L21 8"
                                                stroke="currentColor"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                                            />
                                        </svg>
                                    </motion.div>

                                    {/* Text */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.18, duration: 0.3, ease: "easeOut" }}
                                    >
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {firstName ? `Thanks, ${firstName}!` : "Message Sent!"}
                                        </h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Your message has been received. I&apos;ll get back to you within 24 hours.
                                        </p>
                                    </motion.div>

                                    {/* Divider */}
                                    <div className="my-6 h-px bg-white/6" />

                                    {/* Button */}
                                    <motion.button
                                        onClick={onClose}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.28, duration: 0.25 }}
                                        className="w-full py-2.5 rounded-xl text-sm font-medium text-cyan-400 border border-cyan-500/25 bg-cyan-500/8 hover:bg-cyan-500/15 hover:border-cyan-400/40 transition-all duration-150"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        Back to Portfolio
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
