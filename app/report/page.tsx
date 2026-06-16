"use client";

import { useState } from "react";
import Link from "next/link";

const lengths = ["Short", "Medium", "Long", "Very long"];
const categories = ["Bank", "Hospital", "Government", "Mall", "Market", "Office"];

export default function ReportPage() {
  const [location, setLocation] = useState("");
  const [length, setLength] = useState("Short");
  const [category, setCategory] = useState("Bank");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Queue Status</h1>
              <p className="mt-2 text-sm text-slate-600">
                Submit a quick report for a location queue so others can plan ahead.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Back home
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Location
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-black"
                placeholder="Enter location name"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Queue length
              <select
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-black"
              >
                {lengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-black"
              >
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Report type
              <button
                type="button"
                onClick={() => setLength((current) => (current === "Short" ? "Medium" : current === "Medium" ? "Long" : "Very long"))}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:border-black hover:bg-slate-100"
              >
                Quick pick: {length}
              </button>
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[140px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-black"
              placeholder="Optional details, like how many people are in line or how fast the queue is moving."
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="rounded-3xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Submit Report
            </button>
            <p className="text-sm text-slate-500">
              Reports are shared instantly for nearby users.
            </p>
          </div>

          {submitted && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Thanks! Your queue report is submitted.
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
