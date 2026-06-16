"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LocationMap } from "../../components/LocationMap";

const locations = [
  {
    id: "kcb-bank",
    label: "KCB Bank",
    wait: "15 mins",
    address: "123 Main Street",
    category: "Bank",
    coords: { lat: -1.2921, lng: 36.8219 },
  },
  {
    id: "hospital",
    label: "Hospital",
    wait: "30 mins",
    address: "45 Health Avenue",
    category: "Hospital",
    coords: { lat: -1.2883, lng: 36.8236 },
  },
  {
    id: "huduma-centre",
    label: "Huduma Centre",
    wait: "45 mins",
    address: "77 Government Plaza",
    category: "Government",
    coords: { lat: -1.2833, lng: 36.8167 },
  },
  {
    id: "city-mall",
    label: "City Mall",
    wait: "22 mins",
    address: "9 Commerce Street",
    category: "Mall",
    coords: { lat: -1.3000, lng: 36.8200 },
  },
  {
    id: "central-market",
    label: "Central Market",
    wait: "18 mins",
    address: "16 Market Road",
    category: "Market",
    coords: { lat: -1.2950, lng: 36.8100 },
  },
  {
    id: "county-office",
    label: "County Office",
    wait: "28 mins",
    address: "5 Administration Way",
    category: "Public Service",
    coords: { lat: -1.2860, lng: 36.8080 },
  },
];

export default function LocationPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredLocations = useMemo(
    () =>
      locations.filter((location) => {
        const normalized = query.toLowerCase();
        return (
          location.label.toLowerCase().includes(normalized) ||
          location.address.toLowerCase().includes(normalized) ||
          location.category.toLowerCase().includes(normalized)
        );
      }),
    [query]
  );

  const selectedLocation = locations.find((location) => location.id === selectedId) || filteredLocations[0] || null;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Location search</h1>
            <p className="mt-2 text-sm text-slate-600">
              Find nearby queues, select a spot on the map, and jump straight to details.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Back to home
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700">Search location</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-black"
              placeholder="Search by place, address, or category"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-3xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Clear
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Interactive map</h2>
            <p className="mt-2 text-sm text-slate-600">
              Click a pin to select a location and preview its queue time.
            </p>

            <div className="mt-6">
              <LocationMap
                locations={filteredLocations.length ? filteredLocations : locations}
                selectedLocation={selectedLocation}
                onSelect={setSelectedId}
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {filteredLocations.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                  No locations match your search.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => setSelectedId(location.id)}
                    className={`rounded-3xl border p-4 text-left transition ${
                      selectedLocation?.id === location.id
                        ? "border-black bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:border-black hover:bg-slate-100"
                    }`}
                  >
                    <p className="font-semibold">{location.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{location.address}</p>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Selected location</h2>
            <div className="mt-5 space-y-4">
              {selectedLocation ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {selectedLocation.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{selectedLocation.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">{selectedLocation.address}</p>
                  <div className="mt-4 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Wait time</p>
                      <p className="mt-1 text-lg font-semibold">{selectedLocation.wait}</p>
                    </div>
                    <Link
                      href={`/location/${selectedLocation.id}`}
                      className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
                  Select a location on the map or from the list to see details.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
