"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "../data";
import { IndianRupee, ChevronLeft, MessageSquare, Star, User, Gavel } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const product = useMemo(() => products.find((p) => p.id === params.id), [params.id]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [chatMessage, setChatMessage] = useState<string>("");
  const [reviews, setReviews] = useState<Array<{ id: string; name: string; rating: number; text: string }>>([
    { id: "r1", name: "Priya", rating: 5, text: "Smooth transaction and item exactly as described." },
    { id: "r2", name: "Rahul", rating: 4, text: "Great value; minor wear but works fine." },
  ]);

  if (!product)
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-lg font-medium">Item not found</p>
        <p className="mt-2 text-sm text-foreground/70">The listing you are looking for may have been removed.</p>
        <div className="mt-6">
          <Link href="/marketplace" className="inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">Back to marketplace</Link>
        </div>
      </div>
    );

  const relatedByVendor = products.filter((p) => p.vendorId === product.vendorId && p.id !== product.id).slice(0, 4);

  function submitBid(e: React.FormEvent) {
    e.preventDefault();
    if (!bidAmount || Number(bidAmount) <= 0) return;
    alert(`Bid placed: ₹${Number(bidAmount).toLocaleString()} (demo)`);
    setBidAmount("");
  }

  function sendChat(e: React.FormEvent) {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    alert(`Message sent to ${product.vendorName}: "${chatMessage}" (demo)`);
    setChatMessage("");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to marketplace
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={product.images[activeImageIdx]}
              alt={product.title}
              fill
              className="object-contain p-6 dark:invert"
              priority
            />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-3">
            {product.images.map((src, idx) => (
              <button
                key={src + idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-square overflow-hidden rounded-lg border ${
                  activeImageIdx === idx ? "border-foreground" : "border-foreground/15"
                } bg-background`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image src={src} alt="thumb" fill className="object-contain p-2 dark:invert" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-lg font-semibold">
            <IndianRupee className="h-5 w-5" />
            {product.price.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-foreground/70">
            <span className="capitalize">{product.condition.replace("-", " ")}</span> · {product.location}
          </div>
          <div className="mt-2 text-xs text-foreground/60">Posted {new Date(product.postedAt).toLocaleDateString()}</div>

          <p className="mt-6 text-foreground/80">{product.description}</p>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium">Why it’s useful</p>
            <ul className="list-disc pl-5 text-sm text-foreground/80">
              {product.utilityHighlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-foreground/10 bg-background p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Seller</p>
                <div className="mt-1 flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" /> {product.vendorName}
                </div>
              </div>
              <Link href={`#chat`} className="text-sm text-foreground hover:underline">
                Message seller
              </Link>
            </div>
          </div>

          <form onSubmit={submitBid} className="mt-6 rounded-xl border border-foreground/10 bg-background p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label htmlFor="bid" className="text-sm">Place a bid</label>
                <div className="mt-1 flex items-center rounded-md border border-foreground/15 bg-background px-3">
                  <IndianRupee className="h-4 w-4 opacity-70" />
                  <input
                    id="bid"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter your bid"
                    className="h-10 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
              >
                <Gavel className="h-4 w-4" /> Bid
              </button>
            </div>
            <p className="mt-2 text-xs text-foreground/60">Highest bid feature is demo-only. Wire to backend later.</p>
          </form>
        </div>
      </div>

      <div id="chat" className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-foreground/10 bg-background p-4">
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Chat / Ask about this item
          </h2>
          <form onSubmit={sendChat} className="mt-4 flex gap-2">
            <input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={`Message ${product.vendorName}…`}
              className="h-11 flex-1 rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Send
            </button>
          </form>
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Recent reviews</h3>
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-lg border border-foreground/10 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" /> {r.name}
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-foreground/70">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-foreground/10 bg-background p-4">
            <h2 className="text-lg font-semibold tracking-tight">Related from {product.vendorName}</h2>
            <div className="mt-4 grid gap-4">
              {relatedByVendor.length === 0 && (
                <p className="text-sm text-foreground/70">No other items from this seller.</p>
              )}
              {relatedByVendor.map((item) => (
                <Link
                  key={item.id}
                  href={`/marketplace/${item.id}`}
                  className="group flex gap-3 rounded-lg border border-foreground/10 p-2 hover:border-foreground/30"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-foreground/5">
                    <Image src={item.images[0]} alt={item.title} fill className="object-contain p-2 dark:invert" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs">
                      <IndianRupee className="h-3.5 w-3.5" /> {item.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-foreground/60">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


