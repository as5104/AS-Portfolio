import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Poppins, Great_Vibes } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import Navbar from "@/components/navbar"
import { Toaster } from "sonner"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ankit Sarkar | Portfolio",
  description: "Personal portfolio website of Ankit Sarkar - Frontend Developer",
  keywords: ["portfolio", "frontend developer", "react", "nextjs", "web development"],
  authors: [{ name: "Ankit Sarkar" }],
  generator: "as.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${poppins.variable} ${greatVibes.variable} font-sans bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          style={{ zIndex: 99999 }}
        />
      </body>
    </html>
  )
}
