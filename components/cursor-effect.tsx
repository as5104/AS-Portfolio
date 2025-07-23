"use client"

import { useEffect, useState } from "react"

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [textHovered, setTextHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      document.querySelectorAll(".letter-hover").forEach((element) => {
        if (!element.textContent) return

        if (!element.querySelector("span")) {
          const text = element.textContent
          element.textContent = ""

          for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span")
            span.textContent = text[i]
            element.appendChild(span)
          }
        }

        element.querySelectorAll("span").forEach((span) => {
          const rect = span.getBoundingClientRect()
          const isHovered =
            e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

          if (isHovered) {
            span.classList.add("hovered")
          } else {
            span.classList.remove("hovered")
          }
        })
      })

      // Handle designer circle rotation
      const designerCircle = document.getElementById("designer-circle")
      if (designerCircle) {
        const rect = designerCircle.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate angle between cursor and center of circle
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY

        // Only rotate if cursor is within a certain distance of the circle
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2

        if (distance < maxDistance) {
          // Calculate rotation angle based on cursor position
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

          // Apply rotation with smooth transition
          designerCircle.style.transform = `rotate(${angle}deg) scale(${distance < rect.width ? 1.05 : 1})`
        }
      }
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .hover-text-effect").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          if (el.classList.contains("hover-text-effect")) {
            setTextHovered(true)
          } else {
            setLinkHovered(true)
          }
        })
        el.addEventListener("mouseleave", () => {
          if (el.classList.contains("hover-text-effect")) {
            setTextHovered(false)
          } else {
            setLinkHovered(false)
          }
        })
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [])

  const cursorDotStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    width: clicked ? "12px" : linkHovered ? "16px" : textHovered ? "24px" : "8px",
    height: clicked ? "12px" : linkHovered ? "16px" : textHovered ? "24px" : "8px",
    backgroundColor: textHovered ? "#00FFFF" : "#00FFFF",
  }

  const cursorOutlineStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    width: clicked ? "30px" : linkHovered ? "60px" : textHovered ? "80px" : "40px",
    height: clicked ? "30px" : linkHovered ? "60px" : textHovered ? "80px" : "40px",
    borderColor: textHovered ? "#00FFFF" : "#00FFFF",
    backgroundColor: textHovered ? "rgba(0, 255, 255, 0.1)" : "transparent",
  }

  return (
    <>
      <div className="cursor-dot" style={cursorDotStyle}></div>
      <div className="cursor-outline" style={cursorOutlineStyle}></div>
    </>
  )
}
