"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * SignatureName
 * Animates letter-by-letter (Path-by-Path).
 */
export default function SignatureName() {
    const svgRef = useRef<SVGSVGElement>(null)
    const maskGroupRef = useRef<SVGGElement>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const [pathDataList, setPathDataList] = useState<string[]>([])
    const [viewBox, setViewBox] = useState("0 0 600 100")
    const [isReady, setIsReady] = useState(false)

    // 1. Load Font and Generate Paths
    useEffect(() => {
        let active = true

        const init = async () => {
            try {
                const opentype = await import("opentype.js")
                const font = await opentype.load("/fonts/GreatVibes-Regular.ttf")
                if (!active) return

                const FS = 90
                const text = "Ankit Sarkar"

                const fullPath = font.getPath(text, 0, FS, FS)
                const bb = fullPath.getBoundingBox()

                const PAD = 10
                const vbX = Math.floor(bb.x1) - PAD
                const vbY = Math.floor(bb.y1) - PAD
                const vbW = Math.ceil(bb.x2 - bb.x1) + PAD * 2
                const vbH = Math.ceil(bb.y2 - bb.y1) + PAD * 2

                if (!active) return
                setViewBox(`${vbX} ${vbY} ${vbW} ${vbH}`)

                const paths = font.getPaths(text, 0, FS, FS)
                const dList = paths.map(p => p.toPathData(3)).filter(d => d.trim() !== "")

                if (!active) return
                setPathDataList(dList)
            } catch (err) {
                console.error("[SignatureName] Font load failed:", err)
            }
        }

        init()
        return () => { active = false }
    }, [])

    // 2. Setup GSAP once paths are rendered in DOM
    useEffect(() => {
        if (pathDataList.length === 0 || !maskGroupRef.current) return
        let cancelled = false

        const maskPaths = gsap.utils.toArray<SVGPathElement>(maskGroupRef.current.children)
        if (maskPaths.length === 0) return

        // Calculate continuous path lengths to treat all letters as one long stroke
        const pathLengths = maskPaths.map(p => p.getTotalLength() || 0)
        const totalLen = pathLengths.reduce((a, b) => a + b, 0)

        const pathStarts: number[] = []
        let currentStart = 0
        for (const len of pathLengths) {
            pathStarts.push(currentStart)
            currentStart += len
        }

        // Initialization (Hide Masks)
        maskPaths.forEach((path, i) => {
            const len = pathLengths[i]
            // Direct DOM initialization
            path.style.strokeDasharray = `${len}px`
            path.style.strokeDashoffset = `${len}px`
        })

        // Reveal the SVG container
        setIsReady(true)

        // Proxy object to drive the continuous animation sequence
        const proxy = { progress: 0 }

        const updatePaths = () => {
            // Highly optimized: direct JS to DOM style mutation
            const distance = proxy.progress * totalLen
            for (let i = 0; i < maskPaths.length; i++) {
                const path = maskPaths[i]
                const start = pathStarts[i]
                const len = pathLengths[i]

                if (distance <= start) {
                    path.style.strokeDashoffset = `${len}px`
                } else if (distance >= start + len) {
                    path.style.strokeDashoffset = "0px"
                } else {
                    const drawn = distance - start
                    path.style.strokeDashoffset = `${len - drawn}px`
                }
            }
        }

        // Animation Loop
        const loop = () => {
            if (cancelled) return

            tlRef.current = gsap.timeline({
                onComplete: () => { if (!cancelled) setTimeout(loop, 800) },
            })

            // A) Write in one perfectly fluid motion
            tlRef.current.to(proxy, {
                progress: 1,
                duration: 2.8,
                ease: "power1.inOut", // Parabolic easing, more natural swooping motion than constant sine wave
                onUpdate: updatePaths
            })

            // B) Hold phase
            tlRef.current.to({}, { duration: 0.8 })

            // C) Erase phase
            tlRef.current.to(proxy, {
                progress: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onUpdate: updatePaths
            })
        }

        const timer = setTimeout(loop, 800)

        // Cleanup
        return () => {
            cancelled = true
            clearTimeout(timer)
            tlRef.current?.kill()
        }
    }, [pathDataList])

    return (
        <div className="mt-4 md:mt-5" style={{ display: "inline-block", opacity: isReady ? 1 : 0, transition: "opacity 0.3s" }}>
            <svg
                ref={svgRef}
                viewBox={viewBox}
                aria-label="Ankit Sarkar"
                style={{
                    display: "block",
                    width: "clamp(320px, 65vw, 600px)",
                    height: "auto",
                    overflow: "visible",
                }}
            >
                <defs>
                    <linearGradient id="sigFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="50%" stopColor="#00e5ff" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>

                    <mask id="sigRevealMask">
                        <g ref={maskGroupRef}>
                            {pathDataList.map((d, i) => (
                                <path
                                    key={`mask-${i}`}
                                    d={d}
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="40"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ))}
                        </g>
                    </mask>
                </defs>

                {/* BACKGROUND FAINT TEXT */}
                <g>
                    {pathDataList.map((d, i) => (
                        <path key={`ghost-${i}`} d={d} fill="rgba(255,255,255,0.15)" />
                    ))}
                </g>

                {/* FOREGROUND GRADIENT TEXT (revealed by mask) */}
                <g mask="url(#sigRevealMask)">
                    {pathDataList.map((d, i) => (
                        <path key={`reveal-${i}`} d={d} fill="url(#sigFillGrad)" />
                    ))}
                </g>
            </svg>
        </div>
    )
}
