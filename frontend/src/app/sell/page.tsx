"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useMemo, useState } from "react";
import { IndianRupee, Plus, Trash2, Images, Info } from "lucide-react";

type Condition = "new" | "like-new" | "good" | "fair";

export default function SellPage() {
  const { user } = useAuth();
  const router = useRouter();

  const categories = useMemo(() => ["Books", "Electronics", "Hostel", "Events", "Other"], []);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [condition, setCondition] = useState<Condition>("good");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [utilities, setUtilities] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  function addImageField() {
    setImageUrls((prev) => [...prev, ""]);
  }

  function updateImageUrl(idx: number, value: string) {
    setImageUrls((prev) => prev.map((u, i) => (i === idx ? value : u)));
  }

  function removeImageField(idx: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      alert("Please log in to create a listing");
      return;
    }
    if (!title.trim() || !price || Number(price) <= 0) {
      alert("Please provide a title and valid price");
      return;
    }

    const payload = {
      id: String(Date.now()),
      title: title.trim(),
      price: Number(price),
      images: imageUrls.filter(Boolean),
      category,
      description: description.trim(),
      condition,
      vendorId: user.id,
      vendorName: user.name,
      location: location.trim() || "Campus",
      postedAt: new Date().toISOString(),
      utilityHighlights: utilities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const key = "user_listings";
      const existing = JSON.parse(localStorage.getItem(key) || "[]") as any[];
      localStorage.setItem(key, JSON.stringify([payload, ...existing]));
      alert("Listing created (demo). In a real app this would be saved to the backend.");
      router.push("/profile");
    } catch {
      alert("Failed to save listing locally.");
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-md border border-foreground/10 bg-background px-3 py-1 text-xs text-foreground/70">
          <Info className="h-3.5 w-3.5" /> You must be logged in to create a listing
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">Create a new listing</h1>
        <p className="mt-2 text-sm text-foreground/70">Sign in to list items and reach buyers across your campus.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/auth/login" className="inline-flex h-10 items-center rounded-md border border-foreground/15 px-4 text-sm">Log in</Link>
          <Link href="/auth/signup" className="inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background">Sign up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Create a new listing</h1>
      <p className="mt-2 text-sm text-foreground/70">Add clear details and good photos to help your item sell faster.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm" htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Calculus Textbook (7th Ed.)"
              className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              required
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="price">Price</label>
            <div className="mt-1 flex items-center rounded-md border border-foreground/15 bg-background px-3">
              <IndianRupee className="h-4 w-4 opacity-70" />
              <input
                id="price"
                inputMode="numeric"
                pattern="[0-9]*"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 450"
                className="h-11 flex-1 bg-transparent text-sm outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm" htmlFor="condition">Condition</label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as Condition)}
              className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm"
            >
              <option value="new">New</option>
              <option value="like-new">Like new</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm" htmlFor="location">Location</label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hostel A, Library Block"
              className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm" htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the item, its condition, what’s included…"
              className="mt-1 w-full rounded-md border border-foreground/15 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm" htmlFor="utility">Utility highlights</label>
            <input
              id="utility"
              value={utilities}
              onChange={(e) => setUtilities(e.target.value)}
              placeholder="Comma-separated points, e.g. Great battery, Lightweight, Exam-ready"
              className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Images className="h-4 w-4" /> Images (URLs)
            </div>
            <button type="button" onClick={addImageField} className="inline-flex h-9 items-center gap-2 rounded-md border border-foreground/15 px-3 text-sm">
              <Plus className="h-4 w-4" /> Add image
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <input
                  value={url}
                  onChange={(e) => updateImageUrl(idx, e.target.value)}
                  placeholder="https://…"
                  className="h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
                <div className="flex items-center gap-2">
                  <div className="relative hidden sm:block h-11 w-16 overflow-hidden rounded-md border border-foreground/10 bg-foreground/5">
                    {url ? (
                      <Image src={url} alt="preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-foreground/50">No image</div>
                    )}
                  </div>
                  <button type="button" onClick={() => removeImageField(idx)} className="inline-flex h-9 items-center gap-2 rounded-md border border-foreground/15 px-3 text-sm">
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-foreground/60">Uploads are demo-only. Use public image URLs for previews.</p>
        </div>

        <div>
          <button type="submit" className="inline-flex h-11 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90">
            Publish listing
          </button>
        </div>
      </form>
    </div>
  );
}


