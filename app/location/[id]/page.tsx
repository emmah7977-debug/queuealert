import Link from "next/link";

interface LocationPageProps {
  params: {
    id: string;
  };
}

const locationData: Record<string, { name: string; wait: string; address: string; description: string }> = {
  "kcb-bank": {
    name: "KCB Bank",
    wait: "15 mins",
    address: "123 Main Street",
    description: "A popular bank branch with updated queue times for customer service and ATM access.",
  },
  hospital: {
    name: "Hospital",
    wait: "30 mins",
    address: "45 Health Avenue",
    description: "Medical support center with current wait times for emergency and outpatient services.",
  },
  "huduma-centre": {
    name: "Huduma Centre",
    wait: "45 mins",
    address: "77 Government Plaza",
    description: "Public service office for ID, passports, and other citizen services.",
  },
  "city-mall": {
    name: "City Mall",
    wait: "22 mins",
    address: "9 Commerce Street",
    description: "Shopping mall with busiest store checkout times and parking updates.",
  },
  "central-market": {
    name: "Central Market",
    wait: "18 mins",
    address: "16 Market Road",
    description: "Open-air market with fresh produce stalls and real-time queue reporting.",
  },
  "county-office": {
    name: "County Office",
    wait: "28 mins",
    address: "5 Administration Way",
    description: "County government office handling licenses, permits, and public inquiries.",
  },
};

export default function LocationDetailPage({ params }: LocationPageProps) {
  const location = locationData[params.id];

  if (!location) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Location not found</h1>
          <p className="mt-4 text-slate-600">We couldn&apos;t find that location. Try another one from the list.</p>
          <Link
            href="/location"
            className="mt-6 inline-flex rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Back to locations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{location.name}</h1>
              <p className="mt-2 text-sm text-slate-600">{location.description}</p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
              Current wait: {location.wait}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-700">Address</p>
            <p className="mt-2 text-slate-600">{location.address}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/location"
              className="rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Back to locations
            </Link>
            <button className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
              Report current queue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
