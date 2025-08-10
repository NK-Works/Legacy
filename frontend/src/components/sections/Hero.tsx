"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl/tight md:text-5xl/tight font-semibold tracking-tight"
            >
              Legacy: buy, sell, and discover everything on campus
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-4 text-base md:text-lg text-foreground/80"
            >
              From textbooks and gadgets to hostel essentials and event tickets—
              your campus marketplace, powered by students.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/marketplace"
                className="inline-flex h-11 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Explore marketplace
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-11 items-center rounded-md border border-foreground/20 px-6 text-sm font-medium hover:bg-foreground/5"
              >
                Create an account
              </Link>
            </motion.div>
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-foreground/80">
              <div>
                <p className="font-semibold text-foreground">Zero commission</p>
                <p>Keep 100% of what you earn from your classmates.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Campus-verified</p>
                <p>Listings limited to your college community.</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5">
              <Image
                src="/window.svg"
                alt="Campus marketplace"
                fill
                className="object-contain p-10 dark:invert"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block">
              <div className="rounded-xl border border-foreground/10 bg-background px-4 py-3 shadow-sm">
                <p className="text-xs text-foreground/70">Trusted by 2,000+ students</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


