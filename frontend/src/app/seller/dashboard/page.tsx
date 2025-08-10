"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart as BarChartIcon,
  TrendingUp,
  IndianRupee,
  Package,
  Eye,
  MessageSquare,
  Gavel,
  Plus,
  Settings,
} from "lucide-react";

type Listing = {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  description?: string;
  condition?: string;
  vendorId?: string;
  vendorName?: string;
  location?: string;
  postedAt?: string;
  utilityHighlights?: string[];
};

type Order = {
  id: string;
  listingId: string;
  title: string;
  price: number;
  buyerName: string;
  date: string;
  status: "paid" | "pending" | "refunded";
};

type Message = {
  id: string;
  listingId: string;
  from: string;
  text: string;
  date: string;
};

type Bid = {
  id: string;
  listingId: string;
  amount: number;
  bidder: string;
  date: string;
};

function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    amount
  );
}

export default function SellerDashboardPage() {
  const { user } = useAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);

  // Seed demo data if none exists
  useEffect(() => {
    const localListings = JSON.parse(localStorage.getItem("user_listings") || "[]") as Listing[];

    let seededOrders = JSON.parse(localStorage.getItem("demo_orders") || "null") as Order[] | null;
    let seededMessages = JSON.parse(localStorage.getItem("demo_messages") || "null") as Message[] | null;
    let seededBids = JSON.parse(localStorage.getItem("demo_bids") || "null") as Bid[] | null;

    // Create a few demo listings if none exist yet (for empty accounts)
    const fallbackListings: Listing[] = [
      {
        id: "demo-1",
        title: "Intro to Algorithms (CLRS)",
        price: 899,
        images: ["/file.svg"],
        category: "Books",
      },
      {
        id: "demo-2",
        title: "Scientific Calculator FX-991ES",
        price: 750,
        images: ["/globe.svg"],
        category: "Electronics",
      },
      {
        id: "demo-3",
        title: "Desk Lamp with USB",
        price: 499,
        images: ["/window.svg"],
        category: "Hostel",
      },
    ];

    const effectiveListings = localListings.length > 0 ? localListings : fallbackListings;
    setListings(effectiveListings);

    if (!seededOrders) {
      const now = Date.now();
      seededOrders = Array.from({ length: 7 }).map((_, i) => ({
        id: `o-${i}`,
        listingId: effectiveListings[i % effectiveListings.length].id,
        title: effectiveListings[i % effectiveListings.length].title,
        price: effectiveListings[i % effectiveListings.length].price,
        buyerName: ["Priya", "Rahul", "Aarav", "Ananya", "Kabir", "Isha", "Vikram"][i],
        date: new Date(now - i * 86400000).toISOString(),
        status: (i % 5 === 0 ? "pending" : i % 7 === 0 ? "refunded" : "paid") as Order["status"],
      }));
      localStorage.setItem("demo_orders", JSON.stringify(seededOrders));
    }
    setOrders(seededOrders);

    if (!seededMessages) {
      seededMessages = Array.from({ length: 5 }).map((_, i) => ({
        id: `m-${i}`,
        listingId: effectiveListings[i % effectiveListings.length].id,
        from: ["Neha", "Rohit", "Sara", "Kunal", "Aisha"][i],
        text: [
          "Is the item still available?",
          "Can you share more photos?",
          "Is your price negotiable?",
          "Where can we meet on campus?",
          "Does it come with accessories?",
        ][i],
        date: new Date(Date.now() - i * 3600000).toISOString(),
      }));
      localStorage.setItem("demo_messages", JSON.stringify(seededMessages));
    }
    setMessages(seededMessages);

    if (!seededBids) {
      seededBids = Array.from({ length: 6 }).map((_, i) => ({
        id: `b-${i}`,
        listingId: effectiveListings[i % effectiveListings.length].id,
        amount: effectiveListings[i % effectiveListings.length].price - (i + 1) * 20,
        bidder: ["Riya", "Dev", "Ishan", "Maya", "Arjun", "Zoya"][i],
        date: new Date(Date.now() - (i + 1) * 7200000).toISOString(),
      }));
      localStorage.setItem("demo_bids", JSON.stringify(seededBids));
    }
    setBids(seededBids);
  }, []);

  const kpis = useMemo(() => {
    const periodOrders = orders.filter((o) => Date.now() - new Date(o.date).getTime() < 30 * 86400000);
    const revenue = periodOrders.reduce((sum, o) => (o.status === "paid" ? sum + o.price : sum), 0);
    const conversionRate = listings.length > 0 ? Math.min(32, 8 + listings.length * 2) : 8; // demo %
    const views = listings.length * 120 + periodOrders.length * 20; // demo
    const avgOrderValue = periodOrders.length ? Math.round(revenue / periodOrders.length) : 0;
    return {
      revenue,
      orders: periodOrders.length,
      avgOrderValue,
      conversionRate,
      activeListings: listings.length,
      views,
    };
  }, [listings, orders]);

  const weeklySales = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const base = 3 + (i % 4);
      const variance = (i * 7) % 5;
      return base * 2 + variance; // simple demo values
    });
  }, []);

  const listingStats = useMemo(() => {
    return listings.map((l, idx) => {
      const views = 60 + (idx + 1) * 20;
      const ordersCount = orders.filter((o) => o.listingId === l.id && o.status === "paid").length;
      const revenue = ordersCount * l.price;
      const stock = 5 - (idx % 3);
      return { listing: l, views, ordersCount, revenue, stock };
    });
  }, [listings, orders]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Seller dashboard</h1>
          <p className="text-foreground/70">Insights and tools to grow your campus business.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sell" className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" /> New listing
          </Link>
          <Link href="/profile" className="inline-flex h-10 items-center gap-2 rounded-md border border-foreground/15 px-4 text-sm">
            <Settings className="h-4 w-4" /> Profile
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Revenue (30d)" value={formatCurrencyINR(kpis.revenue)} icon={<IndianRupee className="h-4 w-4" />} />
        <KpiCard label="Orders (30d)" value={String(kpis.orders)} icon={<Package className="h-4 w-4" />} />
        <KpiCard label="Avg order value" value={kpis.avgOrderValue ? formatCurrencyINR(kpis.avgOrderValue) : "—"} />
        <KpiCard label="Conversion" value={`${kpis.conversionRate}%`} icon={<TrendingUp className="h-4 w-4" />} />
        <KpiCard label="Active listings" value={String(kpis.activeListings)} />
        <KpiCard label="Views (30d)" value={String(kpis.views)} icon={<Eye className="h-4 w-4" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-foreground/10 bg-background p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Sales trend</h2>
            <BarChartIcon className="h-4 w-4 opacity-60" />
          </div>
          <MiniBarChart values={weeklySales} max={Math.max(...weeklySales)} labels={["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"]} />
        </section>

        <section className="rounded-xl border border-foreground/10 bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">Messages & bids</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-foreground/10 p-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="inline-flex items-center gap-2"><MessageSquare className="h-4 w-4" /> New messages</span>
                <span>{messages.length}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {messages.slice(0, 4).map((m) => (
                  <li key={m.id} className="flex items-center justify-between">
                    <span className="line-clamp-1">{m.from}: {m.text}</span>
                    <span className="text-xs text-foreground/60">{new Date(m.date).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-foreground/10 p-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="inline-flex items-center gap-2"><Gavel className="h-4 w-4" /> Bids this week</span>
                <span>{bids.length}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {bids.slice(0, 4).map((b) => (
                  <li key={b.id} className="flex items-center justify-between">
                    <span className="line-clamp-1">{b.bidder} bid {formatCurrencyINR(b.amount)} on {listings.find((l) => l.id === b.listingId)?.title ?? "Listing"}</span>
                    <span className="text-xs text-foreground/60">{new Date(b.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-foreground/10 bg-background p-6 overflow-hidden">
          <h2 className="text-lg font-semibold tracking-tight">Top listings</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground/60">
                  <th className="py-2 pr-3 font-normal">Listing</th>
                  <th className="py-2 px-3 font-normal">Price</th>
                  <th className="py-2 px-3 font-normal">Views</th>
                  <th className="py-2 px-3 font-normal">Orders</th>
                  <th className="py-2 pl-3 font-normal">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {listingStats.map(({ listing, views, ordersCount, revenue }) => (
                  <tr key={listing.id} className="border-t border-foreground/10">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md border border-foreground/10 bg-foreground/5">
                          <Image src={listing.images?.[0] ?? "/window.svg"} alt={listing.title} fill className="object-contain p-1.5 dark:invert" />
                        </div>
                        <div>
                          <div className="line-clamp-1 font-medium">{listing.title}</div>
                          <div className="text-xs text-foreground/60">{listing.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">{formatCurrencyINR(listing.price)}</td>
                    <td className="py-3 px-3">{views}</td>
                    <td className="py-3 px-3">{ordersCount}</td>
                    <td className="py-3 pl-3">{formatCurrencyINR(revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-foreground/10 bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">Inventory health</h2>
          <ul className="mt-4 space-y-3">
            {listingStats.map(({ listing, stock, ordersCount }) => {
              const soldRatio = Math.min(100, (ordersCount / (ordersCount + stock || 1)) * 100);
              return (
                <li key={listing.id} className="rounded-lg border border-foreground/10 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="line-clamp-1">{listing.title}</span>
                    <span className="text-xs text-foreground/60">Stock: {stock}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded bg-foreground/10">
                    <div className="h-full bg-foreground" style={{ width: `${soldRatio}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-foreground/10 bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="rounded-lg border border-foreground/10 p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="line-clamp-1 font-medium">{o.title}</div>
                  <div className="text-xs text-foreground/60">{new Date(o.date).toLocaleDateString()}</div>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span>{o.buyerName}</span>
                  <span className="font-medium">{formatCurrencyINR(o.price)}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                    o.status === "paid"
                      ? "bg-green-500/15 text-green-600"
                      : o.status === "pending"
                      ? "bg-yellow-500/15 text-yellow-700"
                      : "bg-red-500/15 text-red-600"
                  }`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-foreground/10 bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">Pricing suggestions</h2>
          <ul className="mt-4 space-y-3">
            {listings.map((l, idx) => {
              const suggestedLow = Math.max(0, Math.round(l.price * 0.9 - idx * 5));
              const suggestedHigh = Math.round(l.price * 1.05 + idx * 5);
              return (
                <li key={l.id} className="rounded-lg border border-foreground/10 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="line-clamp-1">{l.title}</span>
                    <span className="text-xs text-foreground/60">Current: {formatCurrencyINR(l.price)}</span>
                  </div>
                  <div className="mt-1 text-xs text-foreground/70">
                    Suggested: {formatCurrencyINR(suggestedLow)} – {formatCurrencyINR(suggestedHigh)}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Link href="/sell" className="inline-flex h-8 items-center rounded-md border border-foreground/15 px-3 text-xs">Adjust price</Link>
                    <button className="inline-flex h-8 items-center rounded-md border border-foreground/15 px-3 text-xs">Mark as promoted</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

function KpiCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-background p-4">
      <div className="flex items-center justify-between text-xs text-foreground/60">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function MiniBarChart({ values, max, labels }: { values: number[]; max: number; labels: string[] }) {
  return (
    <div className="mt-4">
      <div className="flex h-28 items-end gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex-1">
            <div className="w-full rounded bg-foreground/15" style={{ height: `${(v / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-foreground/60">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}


