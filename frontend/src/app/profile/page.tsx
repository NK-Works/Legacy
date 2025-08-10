"use client";

import Image from "next/image";
import { useAuth } from "@/components/auth/AuthProvider";
import { useMemo, useState } from "react";
import { Heart, ShoppingCart, Package, BadgeCheck, Store, User2, FileText } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const displayName = user?.name ?? "Student";
  const avatar = user?.avatarUrl ?? "/vercel.svg";

  type TabKey =
    | "update-profile"
    | "profile-info"
    | "cart"
    | "orders"
    | "favourites"
    | "become-seller"
    | "seller-verification";

  const [activeTab, setActiveTab] = useState<TabKey>("update-profile");

  const sidebarItems: Array<{
    key: TabKey;
    label: string;
    icon: React.ReactNode;
  }> = useMemo(
    () => [
      { key: "update-profile", label: "Update profile", icon: <User2 className="h-4 w-4" /> },
      { key: "profile-info", label: "Profile information", icon: <FileText className="h-4 w-4" /> },
      { key: "cart", label: "Cart", icon: <ShoppingCart className="h-4 w-4" /> },
      { key: "orders", label: "My orders", icon: <Package className="h-4 w-4" /> },
      { key: "favourites", label: "My favourites", icon: <Heart className="h-4 w-4" /> },
      { key: "become-seller", label: "Become a seller", icon: <Store className="h-4 w-4" /> },
      { key: "seller-verification", label: "Seller verification", icon: <BadgeCheck className="h-4 w-4" /> },
    ],
    []
  );

  const [nameInput, setNameInput] = useState(user?.name ?? "");
  const [emailInput, setEmailInput] = useState(user?.email ?? "");
  const [avatarUrlInput, setAvatarUrlInput] = useState<string>(user?.avatarUrl ?? "");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-foreground/10 bg-foreground/5">
            <Image src={avatar} alt={displayName} fill className="object-contain p-2 dark:invert" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hi, {displayName}</h1>
            <p className="text-sm text-foreground/70">Manage your account, orders, and selling options.</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="inline-flex h-10 items-center rounded-md border border-foreground/15 px-4 text-sm hover:bg-foreground/5"
        >
          Log out
        </button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <nav className="rounded-xl border border-foreground/10 bg-background p-2">
            <div className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60">Account</div>
            {sidebarItems.slice(0, 2).map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  aria-current={isActive}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
            <div className="mt-3 px-2 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60">Shopping</div>
            {sidebarItems.slice(2, 5).map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  aria-current={isActive}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
            <div className="mt-3 px-2 py-2 text-xs font-medium uppercase tracking-wide text-foreground/60">Seller</div>
            {sidebarItems.slice(5).map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  aria-current={isActive}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="lg:col-span-8 xl:col-span-9">
          {activeTab === "update-profile" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">Update profile</h2>
              <p className="mt-1 text-sm text-foreground/70">Keep your account details up to date.</p>
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Profile saved (demo)");
                }}
              >
                <div>
                  <label className="text-sm" htmlFor="name">Full name</label>
                  <input
                    id="name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your name"
                    className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                </div>
                <div>
                  <label className="text-sm" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@college.edu"
                    className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm" htmlFor="avatar">Avatar URL</label>
                  <input
                    id="avatar"
                    value={avatarUrlInput}
                    onChange={(e) => setAvatarUrlInput(e.target.value)}
                    placeholder="https://…"
                    className="mt-1 h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "profile-info" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">Profile information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-xs text-foreground/60">Name</p>
                  <p className="mt-1 text-sm font-medium">{displayName}</p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-4">
                  <p className="text-xs text-foreground/60">Email</p>
                  <p className="mt-1 text-sm font-medium">{user?.email ?? "you@college.edu"}</p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-4 sm:col-span-2">
                  <p className="text-xs text-foreground/60">Avatar</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-foreground/10 bg-foreground/5">
                      <Image src={avatar} alt={displayName} fill className="object-contain p-1.5 dark:invert" />
                    </div>
                    <p className="text-sm text-foreground/70 break-all">{avatar || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cart" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">Cart</h2>
              <p className="mt-1 text-sm text-foreground/70">Items you plan to purchase will appear here.</p>
              <div className="mt-6 rounded-lg border border-dashed border-foreground/15 p-6 text-sm text-foreground/60">
                Your cart is empty.
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">My orders</h2>
              <p className="mt-1 text-sm text-foreground/70">Track your order history and delivery status.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-foreground/10 p-4 text-sm">
                  No orders yet.
                </div>
              </div>
            </div>
          )}

          {activeTab === "favourites" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">My favourites</h2>
              <p className="mt-1 text-sm text-foreground/70">Saved items will show up here for quick access.</p>
              <div className="mt-6 rounded-lg border border-dashed border-foreground/15 p-6 text-sm text-foreground/60">
                No favourites yet.
              </div>
            </div>
          )}

          {activeTab === "become-seller" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">Become a seller</h2>
              <p className="mt-1 text-sm text-foreground/70">Start listing items and reach your campus community.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-foreground/10 p-4 text-sm">
                  Create your first listing with clear photos and honest descriptions.
                </div>
                <div className="rounded-lg border border-foreground/10 p-4 text-sm">
                  Prefer meeting on campus in public, well-lit areas.
                </div>
              </div>
              <a href="/sell" className="mt-6 inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
                Start selling
              </a>
            </div>
          )}

          {activeTab === "seller-verification" && (
            <div className="rounded-xl border border-foreground/10 bg-background p-6">
              <h2 className="text-lg font-semibold tracking-tight">Seller verification</h2>
              <p className="mt-1 text-sm text-foreground/70">Verify your identity to build trust and sell faster.</p>
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm text-foreground/80">
                <li>Upload college ID (front and back)</li>
                <li>Verify college email address</li>
                <li>Complete a quick selfie check</li>
              </ol>
              <button className="mt-6 inline-flex h-11 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/90">
                Start verification
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


