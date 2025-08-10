import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_60%)]">
            <Image
              src="/globe.svg"
              alt="Students building their legacy"
              fill
              className="object-contain p-10 dark:invert"
              priority
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About Legacy</h1>
          <p className="mt-4 text-foreground/80">
            Legacy is a student-first marketplace designed for college communities. Buy and sell textbooks, electronics,
            hostel essentials, and event tickets with verified peers from your campus. Our mission is to make student life
            simpler, more affordable, and more connected.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <h3 className="font-medium">Why we built it</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Students already trade everything on campus—Legacy gives them a safe, delightful place to do it.
          </p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <h3 className="font-medium">What’s next</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Listings by departments, secure payments, reputation, and more. We’re just getting started.
          </p>
        </div>
      </div>
    </div>
  );
}


