function ProjectCard({ title, location, year, tags }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridLight" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridLight)" />
        </svg>
        <div className="absolute inset-4 rounded-xl border border-gray-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{year}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-xs tracking-wide rounded-full border border-gray-300 px-2.5 py-1 text-gray-700 bg-white">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-gray-300 rounded-2xl transition" />
    </div>
  )
}

export default function Portfolio() {
  const projects = [
    { title: 'Horizon Residence', location: 'Los Angeles, CA', year: '2024', tags: ['Residential', 'Concrete', 'Glass'] },
    { title: 'Atrium Offices', location: 'Austin, TX', year: '2023', tags: ['Workplace', 'Adaptive Reuse'] },
    { title: 'Coastline Retreat', location: 'Big Sur, CA', year: '2022', tags: ['Hospitality', 'Timber'] },
    { title: 'Gallery Annex', location: 'New York, NY', year: '2022', tags: ['Cultural', 'Minimal'] },
    { title: 'Courtyard House', location: 'Scottsdale, AZ', year: '2021', tags: ['Residential', 'Passive Design'] },
    { title: 'Ridge Pavillion', location: 'Boulder, CO', year: '2020', tags: ['Public', 'Steel'] },
  ]

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-3">Selected Work</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Built with precision and calm</h2>
          </div>
          <a href="#contact" className="hidden md:inline-block text-sm text-gray-700 hover:text-gray-900 underline underline-offset-4">Inquire about availability</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
