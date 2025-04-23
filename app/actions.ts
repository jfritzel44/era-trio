"use server"

import { Resend } from "resend"

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Era Trio Website <onboarding@resend.dev>", // Use a verified domain in production
      to: ["jafritzel@gmail.com"],
      subject: `Contact Form: ${data.subject}`,
      reply_to: data.email,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      // You can also use HTML for a nicer email
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #b8860b;">New message from Era Trio website</h2>
  <p><strong>From:</strong> ${data.name} (${data.email})</p>
  <p><strong>Subject:</strong> ${data.subject}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #b8860b;">
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  </div>
</div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      }
    }

    console.log("Email sent successfully:", emailData)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}
