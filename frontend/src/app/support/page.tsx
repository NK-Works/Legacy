import { Mail, BookOpen, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Support</h1>
      <p className="mt-3 text-foreground/80">We’re here to help. Find answers, guides, or reach out to our team.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3"><Mail className="h-5 w-5" /><h3 className="font-medium">Contact us</h3></div>
          <p className="mt-2 text-sm text-foreground/70">Get in touch for issues, feedback, or reports.</p>
          <a href="#contact" className="mt-3 inline-block text-sm text-foreground hover:underline">Write a message</a>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5" /><h3 className="font-medium">Guides</h3></div>
          <p className="mt-2 text-sm text-foreground/70">Read how-to articles for buying, selling, and safety.</p>
          <a href="/how-it-works" className="mt-3 inline-block text-sm text-foreground hover:underline">How it works</a>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5" /><h3 className="font-medium">FAQ</h3></div>
          <p className="mt-2 text-sm text-foreground/70">Common questions answered in one place.</p>
          <a href="#faq" className="mt-3 inline-block text-sm text-foreground hover:underline">View FAQ</a>
        </div>
      </div>

      <div id="contact" className="mt-12 rounded-xl border border-foreground/10 bg-background p-6">
        <h2 className="text-lg font-semibold tracking-tight">Send us a message</h2>
        <form className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="text-sm" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@college.edu" className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20" />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm" htmlFor="topic">Topic</label>
            <input id="topic" placeholder="Account, listing, report…" className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm" htmlFor="message">Message</label>
            <textarea id="message" rows={5} placeholder="Tell us what happened…" className="mt-1 w-full rounded-md border border-foreground/15 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}


