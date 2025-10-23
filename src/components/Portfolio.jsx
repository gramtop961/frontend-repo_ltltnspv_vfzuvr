import { useEffect, useMemo, useState } from 'react'

function ProjectCard({ title, location, year, tags, image_url, description }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 via-white to-gray-200">
        {image_url ? (
          <img src={image_url} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridLight" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridLight)" />
          </svg>
        )}
        <div className="absolute inset-4 rounded-xl border border-gray-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {year && <span className="text-xs text-gray-500">{year}</span>}
        </div>
        {location && <p className="text-sm text-gray-600 mt-1">{location}</p>}
        {description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.isArray(tags) && tags.map((t) => (
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
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    title: '',
    location: '',
    year: '',
    tags: '',
    image_url: '',
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''
  const projectsUrl = useMemo(() => `${backend}/api/projects`, [backend])

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(projectsUrl)
        if (!res.ok) throw new Error('Failed to load projects')
        const data = await res.json()
        if (isMounted) setProjects(Array.isArray(data.items) ? data.items : [])
      } catch (e) {
        if (isMounted) setError('Could not load projects at the moment.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    if (backend) load()
    else {
      setLoading(false)
      setError('Backend URL is not configured.')
    }
    return () => { isMounted = false }
  }, [projectsUrl, backend])

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    setSaveMsg('')

    if (!form.title.trim()) {
      setError('Please provide a project title.')
      return
    }

    const payload = {
      title: form.title.trim(),
      location: form.location.trim() || undefined,
      year: form.year.trim() || undefined,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      image_url: form.image_url.trim() || undefined,
      description: form.description.trim() || undefined,
    }

    try {
      setSaving(true)
      const res = await fetch(projectsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to save project')
      setSaveMsg('Project saved')
      setForm({ title: '', location: '', year: '', tags: '', image_url: '', description: '' })
      // reload list
      const list = await fetch(projectsUrl)
      const data = await list.json()
      setProjects(Array.isArray(data.items) ? data.items : [])
    } catch (e) {
      setError('Could not save project. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-3">Selected Work</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Built with precision and calm</h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="text-sm text-gray-700 hover:text-gray-900 underline underline-offset-4">Inquire about availability</a>
            <button onClick={() => setShowForm(v => !v)} className="text-sm rounded-full border border-gray-300 px-3 py-1.5 hover:border-gray-400">{showForm ? 'Close' : 'Add Project'}</button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Project title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input value={form.year} onChange={e => setForm(f => ({...f, year: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="2024" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Residential, Timber, Minimal" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input value={form.image_url} onChange={e => setForm(f => ({...f, image_url: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="mt-1 w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900" placeholder="Short description" />
              </div>
              {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
              {saveMsg && <p className="md:col-span-2 text-sm text-green-700">{saveMsg}</p>}
              <div className="md:col-span-2 flex gap-3">
                <button disabled={saving} type="submit" className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-5 py-2.5 font-medium hover:bg-gray-800 transition disabled:opacity-60">{saving ? 'Saving…' : 'Save project'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 text-gray-900 px-5 py-2.5 hover:border-gray-400">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading projects…</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">No projects yet. Use “Add Project” to create your first entry.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p) => (
              <ProjectCard key={p._id || p.title} {...p} />)
            )}
          </div>
        )}
      </div>
    </section>
  )
}
