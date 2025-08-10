import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-semibold tracking-tight">Legacy</h3>
          <p className="text-sm text-foreground/70">
            A marketplace for students to buy, sell, and discover everything on campus.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Marketplace</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link className="hover:text-foreground" href="/marketplace?cat=books">Books</Link></li>
            <li><Link className="hover:text-foreground" href="/marketplace?cat=electronics">Electronics</Link></li>
            <li><Link className="hover:text-foreground" href="/marketplace?cat=hostel">Hostel</Link></li>
            <li><Link className="hover:text-foreground" href="/marketplace?cat=events">Events</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link className="hover:text-foreground" href="/how-it-works">How it works</Link></li>
            <li><Link className="hover:text-foreground" href="/safety-tips">Safety tips</Link></li>
            <li><Link className="hover:text-foreground" href="/support">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Account</h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link className="hover:text-foreground" href="/auth/login">Log in</Link></li>
            <li><Link className="hover:text-foreground" href="/auth/signup">Sign up</Link></li>
            <li><Link className="hover:text-foreground" href="/sell">Create listing</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-foreground/60 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Legacy. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


