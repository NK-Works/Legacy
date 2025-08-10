import { ShieldCheck, MapPin, UserCheck, AlertTriangle, Phone } from "lucide-react";

export default function SafetyTipsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Safety tips</h1>
      <p className="mt-3 text-foreground/80">Simple rules to keep your campus trading safe and stress-free.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><MapPin className="h-5 w-5" /></div>
            <h3 className="font-medium">Meet in public places</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Prefer well-lit, busy areas on campus like the library, cafeteria, or main quad.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><UserCheck className="h-5 w-5" /></div>
            <h3 className="font-medium">Verify the listing</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">Check photos, condition, and ask for a live demo if needed.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><ShieldCheck className="h-5 w-5" /></div>
            <h3 className="font-medium">Bring a friend</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">For higher-value exchanges, have a friend accompany you.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-foreground/10 p-2"><AlertTriangle className="h-5 w-5" /></div>
            <h3 className="font-medium">Trust your instincts</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/70">If something feels off, walk away. Report suspicious activity to admins.</p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-foreground/10 bg-background p-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Phone className="h-4 w-4" /> Need help?
        </div>
        <p className="mt-2 text-sm text-foreground/70">Contact campus security or reach us via the Support page for guidance.</p>
      </div>
    </div>
  );
}


