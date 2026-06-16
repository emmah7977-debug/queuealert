"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          MyApp
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/location" className="text-sm font-medium text-slate-700 transition hover:text-black">
            Locations
          </Link>
          <Link href="/report" className="text-sm font-medium text-slate-700 transition hover:text-black">
            Report
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-700 transition hover:text-black">
            Dashboard
          </Link>

          <Show when="signed-out">
            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard"
            >
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton
              mode="modal"
              forceRedirectUrl="/dashboard"
            >
              <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}