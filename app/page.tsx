"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, MapPin, Play, Youtube, Menu, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, type FormEvent } from "react"
import { sendContactEmail } from "./actions"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Contact form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")

    try {
      // Send email using the server action
      const result = await sendContactEmail({
        name,
        email,
        subject,
        message,
      })

      if (result.success) {
        setIsSubmitted(true)
        setIsSubmitting(false)
        // Reset form fields
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        setFormError(result.error || "Failed to send message. Please try again.")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setFormError("There was an error submitting the form. Please try again.")
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setFormError("")
  }

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Navigation */}
      <header className="border-b border-gold-500/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-12 mr-3">
                <Image src="/images/era-trio-logo.png" alt="The Era Trio Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-serif text-gold-400 tracking-wide">The Era Trio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-cream-100 hover:text-gold-400 transition">
                About
              </Link>
              <Link href="#music" className="text-cream-100 hover:text-gold-400 transition">
                Music
              </Link>
              <Link href="#shows" className="text-cream-100 hover:text-gold-400 transition">
                Shows
              </Link>
              <Link href="#contact" className="text-cream-100 hover:text-gold-400 transition">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-cream-100 hover:text-gold-400 transition"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gold-500/20 mt-4 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-4 text-center">
                <Link
                  href="#about"
                  className="text-cream-100 hover:text-gold-400 transition py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#music"
                  className="text-cream-100 hover:text-gold-400 transition py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Music
                </Link>
                <Link
                  href="#shows"
                  className="text-cream-100 hover:text-gold-400 transition py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shows
                </Link>
                <Link
                  href="#contact"
                  className="text-cream-100 hover:text-gold-400 transition py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-950"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl text-cream-100 leading-tight mb-4">
              Chicago's Finest <span className="text-gold-400">Funk & Jazz</span> Experience
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              A vibrant blend of funk, blues, soul, and jazz that ignites crowds and sets the perfect vibe for any
              venue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#shows">
                <Button className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-medium w-full">
                  Upcoming Shows <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#music">
                <Button variant="outline" className="border-cream-100/20 text-cream-100 hover:bg-cream-100/10 w-full">
                  Listen to Our Music <Play className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-950 to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-navy-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl text-gold-400 mb-6">About The Era Trio</h2>
              <p className="text-cream-100/90 mb-6 leading-relaxed">
                Chicago's own The Era Trio brings a vibrant blend of funk, blues, soul, and jazz to every stage they
                play. With rich grooves, tight rhythms, and an undeniable energy, The Era Trio delivers an engaging
                musical experience rooted in timeless styles and fresh Chicago spirit.
              </p>
              <p className="text-cream-100/90 mb-8 leading-relaxed">
                Equally at home igniting lively bar crowds or setting a smooth, laid-back vibe for speakeasies, our
                sound transcends generations while staying true to the rich musical heritage of Chicago.
              </p>
              <Button variant="outline" className="border-gold-500 text-gold-400 hover:bg-gold-500/10">
                Our Story
              </Button>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Alex */}
              <div className="relative rounded-lg overflow-hidden h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent z-10"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-Z7VmetcS5kRfRjMjxN4HPNVpbCzqae.png"
                  alt="Alex Fritzel on keys"
                  className="w-full h-full object-cover object-top object-position-y-[30%]"
                  style={{ objectPosition: "center 30%" }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-cream-100 font-medium">Alex Fritzel</p>
                  <p className="text-gold-400 text-sm">Keys</p>
                </div>
              </div>

              {/* Ellie */}
              <div className="relative rounded-lg overflow-hidden h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent z-10"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ellie-nIpnXVucSIPbFMny7bbZizBZHsCVOn.png"
                  alt="Ellie Rui on drums"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-cream-100 font-medium">Ellie Rui</p>
                  <p className="text-gold-400 text-sm">Drums</p>
                </div>
              </div>

              {/* Rahsaan */}
              <div className="relative rounded-lg overflow-hidden h-64 md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent z-10"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-19%20at%202.53.17%E2%80%AFPM-joVkLjYyqOpeWsMnFGh03XmVNF7opY.png"
                  alt="Rahsaan on bass"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-cream-100 font-medium">Rahsaan</p>
                  <p className="text-gold-400 text-sm">Bass</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-24 bg-navy-950 relative scroll-mt-16">
        <div className="absolute inset-0 bg-[url('/images/vinyl-texture.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-gold-400 mb-4">Our Music</h2>
            <p className="text-cream-100/70 max-w-2xl mx-auto">
              Experience our unique blend of funk, blues, soul, and jazz that defines The Era Trio sound.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* First Video Link */}
            <a
              href="https://www.youtube.com/watch?v=pp2ExlDgl28"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video w-full rounded-lg overflow-hidden shadow-xl relative group"
            >
              <div className="absolute inset-0 bg-navy-800/50 flex items-center justify-center group-hover:bg-navy-800/30 transition-all duration-300">
                <div className="bg-gold-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Youtube className="h-10 w-10 text-navy-950" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-4">
                <h3 className="text-xl font-serif text-cream-100">The Era Trio Performance</h3>
                <p className="text-gold-400">Watch on YouTube</p>
              </div>
              <img
                src="https://img.youtube.com/vi/pp2ExlDgl28/maxresdefault.jpg"
                alt="The Era Trio Performance"
                className="w-full h-full object-cover"
              />
            </a>

            {/* Second Video Link - Updated with new image */}
            <a
              href="https://www.youtube.com/watch?v=Tfi9_aw3sM0"
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video w-full rounded-lg overflow-hidden shadow-xl relative group"
            >
              <div className="absolute inset-0 bg-navy-800/50 flex items-center justify-center group-hover:bg-navy-800/30 transition-all duration-300">
                <div className="bg-gold-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Youtube className="h-10 w-10 text-navy-950" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-4">
                <h3 className="text-xl font-serif text-cream-100">Era Trio - Chicago Band</h3>
                <p className="text-gold-400 text-sm">Jalexkeys • 26 views • 1 month ago</p>
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JkbVrjIjKNJEeDKgiNAyHFx0bhu2om.png"
                alt="Era Trio - Chicago Band - Drummer smiling during performance"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" className="py-24 bg-navy-900 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-gold-400 mb-4">Upcoming Shows</h2>
            <p className="text-cream-100/70 max-w-2xl mx-auto">
              Catch The Era Trio live at these upcoming venues around Chicago and beyond.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { date: "June 12, 2025", venue: "Fullers Pub", location: "Chicago, IL" },
              { date: "July 2, 2025", venue: "Wilmette Theater", location: "Wilmette, IL" },
            ].map((show, index) => (
              <div
                key={index}
                className="bg-navy-950/70 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center border border-cream-100/10 hover:border-gold-500/30 transition"
              >
                <div className="md:w-1/4 flex flex-col items-center md:items-start">
                  <Calendar className="h-6 w-6 text-gold-400 mb-2" />
                  <span className="text-cream-100 font-medium">{show.date}</span>
                </div>
                <div className="md:w-1/3">
                  <h3 className="font-serif text-xl text-cream-100 text-center md:text-left">{show.venue}</h3>
                </div>
                <div className="md:w-5/12 flex items-center">
                  <MapPin className="h-5 w-5 text-gold-400 mr-2" />
                  <span className="text-cream-100/80">{show.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Completely rebuilt */}
      <section id="contact" className="py-24 bg-navy-950 relative z-10">
        <div className="container mx-auto px-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-cream-100 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
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
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-cream-100 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
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
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-navy-950 border border-cream-100/20 rounded-md px-4 py-3 text-cream-100 focus:outline-none focus:border-gold-500"
                    required
                  ></textarea>
                </div>
                {formError && (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-400">{formError}</p>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-gold-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <div className="relative h-10 w-10 mr-3">
                <Image src="/images/era-trio-logo.png" alt="The Era Trio Logo" fill className="object-contain" />
              </div>
              <div>
                <Link href="/" className="text-2xl font-serif text-gold-400 tracking-wide">
                  The Era Trio
                </Link>
                <p className="text-cream-100/60 mt-1">Chicago's finest funk & jazz experience</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Link href="#about" className="text-cream-100 hover:text-gold-400 transition">
                About
              </Link>
              <Link href="#music" className="text-cream-100 hover:text-gold-400 transition">
                Music
              </Link>
              <Link href="#shows" className="text-cream-100 hover:text-gold-400 transition">
                Shows
              </Link>
              <Link href="#contact" className="text-cream-100 hover:text-gold-400 transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-cream-100/10 mt-8 pt-8 text-center">
            <p className="text-cream-100/60">© {new Date().getFullYear()} The Era Trio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
