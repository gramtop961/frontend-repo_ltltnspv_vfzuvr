export default function About() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-b from-gray-100 to-white">
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/80 backdrop-blur rounded-xl px-4 py-3 border border-gray-200">
                  <p className="text-sm text-gray-600">Founder & Principal</p>
                  <p className="font-semibold text-gray-900">Alex Rivera</p>
                </div>
              </div>
              <div className="absolute inset-6 rounded-xl border border-gray-300" />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-4">About</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">Designing spaces with restraint and intention</h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              With over a decade of experience in residential and commercial architecture, I bring a calm, detail-driven approach to every project. My work balances clarity and warmth—honoring context, celebrating material, and refining each surface and junction.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From early concept to occupancy, I collaborate closely with clients, consultants, and builders to deliver spaces that age gracefully. The studio embraces sustainable strategies and precision documentation to ensure a smooth path from vision to reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
