import { Search, MessageSquare, Handshake, IndianRupee, Star } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works</h1>
      <p className="mt-3 text-foreground/80">
        Legacy makes student-to-student trading simple and safe. Follow these steps to find what you need or sell what you have.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><Search className="h-5 w-5" /></div>
            <h3 className="font-medium">Browse and discover</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Explore categories or search for books, electronics, hostel items, and more.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><MessageSquare className="h-5 w-5" /></div>
            <h3 className="font-medium">Chat with the seller</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Ask questions, request photos, and negotiate fairly right on the listing page.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><Handshake className="h-5 w-5" /></div>
            <h3 className="font-medium">Meet on campus</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Pick safe, public spots like the library or cafeteria to exchange items.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><IndianRupee className="h-5 w-5" /></div>
            <h3 className="font-medium">Pay and rate</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Pay as agreed. Share a quick review to help your peers shop with confidence.</p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-foreground/10 bg-background p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Star className="h-4 w-4" /> Pro tip
        </div>
        <p className="mt-2 text-sm text-foreground/70">Use the bidding option on listings to make competitive offers without haggling.</p>
      </div>
    </div>
  );
}


