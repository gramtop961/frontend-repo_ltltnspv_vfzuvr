import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSent(false)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!backend) {
      setError('Backend URL is not configured.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${backend}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), phone: phone.trim() || undefined })
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
      setPhone('')
    } catch (e) {
      setError('Could not send your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Let’s discuss your project</h2>
            <p className="mt-4 text-gray-600">Whether it’s a new build, renovation, or feasibility study, we’d love to hear from you. Share a few details and we’ll be in touch.</p>

            <div className="mt-8 space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <a href="mailto:studio@example.com" className="hover:underline">studio@example.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500" />
                <a href="tel:+15551234567" className="hover:underline">+1 (555) 123-4567</a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  placeholder="+1 555 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  placeholder="Tell us about your site, budget, and timeline"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {sent && <p className="text-sm text-green-700">Thanks for reaching out — your message has been received.</p>}
              <div className="pt-2">
                <button disabled={loading} type="submit" className="w-full inline-flex justify-center rounded-lg bg-gray-900 text-white px-5 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-60">
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
