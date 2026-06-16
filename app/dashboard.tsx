"use client";

import Link from "next/link";

const recentReports = [
  {
    id: 1,
    location: "KCB Bank",
    length: "Short",
    category: "Bank",
    time: "5 mins ago",
    author: "John D.",
  },
  {
    id: 2,
    location: "Hospital",
    length: "Long",
    category: "Hospital",
    time: "12 mins ago",
    author: "Sarah M.",
  },
  {
    id: 3,
    location: "City Mall",
    length: "Medium",
    category: "Mall",
    time: "23 mins ago",
    author: "Mike T.",
  },
  {
    id: 4,
    location: "Huduma Centre",
    length: "Very long",
    category: "Government",
    time: "38 mins ago",
    author: "Jane K.",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
              View and manage queue reports from your community.
            </p>
          </div>

          <Link
            href="/report"
            className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            + Add New Report
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-6">
            <h2 className="text-2xl font-semibold">Recent Queue Reports</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-4 px-8 py-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{report.location}</p>
                  <p className="text-sm text-slate-600">
                    {report.category} · {report.length} queue
                  </p>
                  <p className="text-xs text-slate-500">
                    {report.author} · {report.time}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    {report.length}
                  </span>
                  <Link
                    href={`/location/${report.location.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900 transition hover:bg-slate-200"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Stats</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-600">Total Reports</p>
              <p className="mt-2 text-3xl font-bold">127</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-600">Active Locations</p>
              <p className="mt-2 text-3xl font-bold">24</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-600">Community Users</p>
              <p className="mt-2 text-3xl font-bold">356</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
