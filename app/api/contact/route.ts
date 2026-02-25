import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

// Basic email validation
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Sanitize input to prevent injection in email body
function sanitize(str: string): string {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        // --- Validation ---
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            )
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            )
        }

        // Enforce reasonable length limits
        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json(
                { error: "Input exceeds maximum allowed length." },
                { status: 400 }
            )
        }

        // --- Send email via Resend ---
        const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["sarkarkrad58@gmail.com"],
            replyTo: sanitize(email),
            subject: `[Portfolio] ${sanitize(subject)}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f0f; color: #ffffff; border-radius: 8px;">
          <h2 style="color: #00ffff; margin-top: 0;">Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #9ca3af; width: 80px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${sanitize(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Email</td>
              <td style="padding: 8px 0;">${sanitize(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #9ca3af;">Subject</td>
              <td style="padding: 8px 0;">${sanitize(subject)}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #374151; margin: 16px 0;" />
          <p style="color: #9ca3af; margin-bottom: 8px;">Message:</p>
          <p style="background: #1f2937; padding: 16px; border-radius: 6px; white-space: pre-wrap; margin: 0;">${sanitize(message)}</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px; margin-bottom: 0;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
        })

        if (error) {
            console.error("Resend error:", error)
            return NextResponse.json(
                { error: "Failed to send email. Please try again later." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 200 }
        )
    } catch (err) {
        console.error("Contact API error:", err)
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        )
    }
}
