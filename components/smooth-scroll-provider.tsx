"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Global lenis instance
let lenisInstance: Lenis | null = null
export function getLenis() {
    return lenisInstance
}


export function smoothScrollTo(
    target: string | number,
    opts: { offset?: number; duration?: number } = {}
) {
    const lenis = lenisInstance

    if (!lenis) {
        if (typeof target === "string") {
            const el = document.querySelector(target)
            if (el) el.scrollIntoView({ behavior: "smooth" })
        }
        return
    }

    let resolvedTarget: string | number = target
    if (typeof target === "string") {
        const el = document.querySelector(target) as HTMLElement | null
        if (!el) return
        resolvedTarget = el.getBoundingClientRect().top + window.scrollY + (opts.offset || 0)
        resolvedTarget = Math.max(0, resolvedTarget)
    }

    // Calculate a natural duration based on distance
    const currentScroll = lenis.scroll
    const distance = Math.abs((resolvedTarget as number) - currentScroll)
    const baseDuration = opts.duration ?? Math.min(2.2, Math.max(0.8, distance / 1200))

    lenis.scrollTo(resolvedTarget, {
        duration: baseDuration,
        easing: (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        },
    })
}

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisRef.current = lenis
        lenisInstance = lenis

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        // Drive Lenis via GSAP ticker for perfectly synced frames
        const rafCallback = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(rafCallback)
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            lenisInstance = null
            ScrollTrigger.getAll().forEach((st) => st.kill())
            gsap.ticker.remove(rafCallback)
        }
    }, [])

    return <>{children}</>
}
