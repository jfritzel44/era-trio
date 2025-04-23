"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError("Please fill out all fields")
      setIsSubmitting(false)
      return
    }

    try {
      // In a real application, you would send this data to your server
      console.log("Form submission to jafritzel@gmail.com:", {
        name,
        email,
        subject,
        message,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setIsSubmitting(false)

      // Reset form state
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("There was an error submitting the form. Please try again.")
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setError("")
  }

  return (
    <div className="max-w-4xl mx-auto bg-navy-900/80 rounded-xl p-8 md:p-12 border border-cream-100/10">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-gold-400 mb-4">Get in Touch</h2>
        <p className="text-cream-100/70 max-w-2xl mx-auto">
          Book The Era Trio for your venue, event, or just drop us a line to say hello.
        </p>
        <p className="text-gold-400/80 mt-2">Messages will be sent to: jafritzel@gmail.com</p>
      </div>
      {isSubmitted ? (
        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-serif text-green-400 mb-2">Message Sent!</h3>
          <p className="text-cream-100">Thank you for your message. We'll get back to you soon!</p>
          <Button onClick={resetForm} className="mt-4 bg-gold-500 hover:bg-gold-600 text-navy-950">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-cream-100 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-cream-100 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-cream-100 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-cream-100 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
              required
            ></textarea>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              className="bg-gold-500 hover:bg-gold-600 text-navy-950 px-8 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
