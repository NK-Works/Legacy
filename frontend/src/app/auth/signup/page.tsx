"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-foreground/70">Join your campus marketplace</p>

        <button
          type="button"
          className="mt-6 inline-flex w-full h-11 items-center justify-center rounded-md border border-foreground/15 bg-background text-sm font-medium hover:bg-foreground/5"
          onClick={() => {/* integrate auth provider later */}}
        >
          <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-foreground/60">
          <div className="h-px flex-1 bg-foreground/15" /> OR <div className="h-px flex-1 bg-foreground/15" />
        </div>

        <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm" htmlFor="name">Full name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="email">College email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu"
            className="w-full h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          />
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90"
        >
          Sign up
        </button>
        </form>

        <p className="mt-6 text-sm text-foreground/70">
          Already have an account? {" "}
          <Link className="text-foreground hover:underline" href="/auth/login">Log in</Link>
        </p>
      </div>

      <div className="relative hidden md:block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
          <Image src="/window.svg" alt="Join Legacy" fill className="object-contain p-10 dark:invert" />
        </div>
      </div>
    </div>
  );
}


