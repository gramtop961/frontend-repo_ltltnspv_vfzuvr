import { ArrowRight } from 'lucide-react'

export default function NavbarHero() {
  return (
    <header className="relative overflow-hidden">
      {/* Top navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight text-xl text-gray-900">Atelier Modern</a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="#work" className="text-gray-700 hover:text-gray-900">Work</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 transition">
              Start a Project <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <div id="top" className="pt-28">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* background decoration */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-gray-200 to-white blur-3xl opacity-70" />
            <div className="absolute top-48 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-gray-100 to-white blur-3xl opacity-80" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="py-16">
              <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-4">Modern Architecture Studio</p>
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-gray-900">
                Classy, minimal spaces built for life
              </h1>
              <p className="mt-6 text-gray-600 max-w-xl">
                We craft timeless residential and commercial environments with a focus on light, proportion, and material honesty. Precision meets warmth in every line we draw.
              </p>
              <div className="mt-8 flex gap-3">
                <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-3 hover:bg-gray-800 transition">
                  View Portfolio <ArrowRight size={18} />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-gray-300 text-gray-900 px-5 py-3 hover:border-gray-400 transition">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 border border-gray-200">
              {/* simple architectural grid */}
              <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute inset-6 rounded-xl border border-gray-300" />
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-gray-300" />
              <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-px bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
