import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ankit Sarkar | Portfolio",
  description: "Personal portfolio website of Ankit Sarkar - Frontend Developer",
  keywords: ["portfolio", "frontend developer", "react", "nextjs", "web development"],
  authors: [{ name: "Ankit Sarkar" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-black text-white antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
