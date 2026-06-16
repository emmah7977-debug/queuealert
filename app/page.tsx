import { Navbar } from "../components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-slate-900">
              Skip the Queue
            </h1>
            <p className="mt-6 text-xl text-slate-600">
              Real-time queue updates from your community. Check wait times before you go.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-lg bg-black px-6 py-3 text-white font-medium transition hover:bg-slate-800"
              >
                View Queues
              </Link>
              <Link
                href="/report"
                className="rounded-lg border border-slate-300 px-6 py-3 text-slate-900 font-medium transition hover:bg-slate-50"
              >
                Report a Queue
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">Why Use Queue Alert?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="text-lg font-semibold text-slate-900">Real-time Updates</h3>
                <p className="mt-2 text-slate-600">Get instant queue information from your community</p>
              </div>
              <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="text-lg font-semibold text-slate-900">Multiple Locations</h3>
                <p className="mt-2 text-slate-600">Banks, hospitals, government offices, and more</p>
              </div>
              <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-slate-900">Community Powered</h3>
                <p className="mt-2 text-slate-600">Help others by reporting queue information</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}