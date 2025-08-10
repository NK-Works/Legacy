"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, ShoppingBag, Store, Sun, Moon, User2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { LogOut, User as UserIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 backdrop-blur bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span className="font-semibold tracking-tight">Legacy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm text-foreground/80 hover:text-foreground transition-colors",
                  active && "text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute left-0 -bottom-1 h-0.5 w-full bg-foreground"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/15"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-foreground/15 px-3 text-sm"
              >
                <UserIcon className="h-4 w-4" /> Profile
              </Link>
              <button
                onClick={logout}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-foreground/15 px-3 text-sm"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/15"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-foreground/10 bg-background/80"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-foreground/80 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <button
              className="inline-flex h-9 items-center rounded-md border border-foreground/15 px-3 text-sm"
              onClick={() => {
                toggle();
                setOpen(false);
              }}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="mr-1 inline h-4 w-4" /> Light mode
                </>
              ) : (
                <>
                  <Moon className="mr-1 inline h-4 w-4" /> Dark mode
                </>
              )}
            </button>

            <div className="flex items-center gap-3 pt-2">
              {!user ? (
                <>
                  <Link href="/auth/login" className="text-sm">
                    <User2 className="mr-1 inline h-4 w-4" /> Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex h-9 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background"
                  >
                    <ShoppingBag className="mr-1 inline h-4 w-4" /> Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" className="text-sm">
                    <UserIcon className="mr-1 inline h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="inline-flex h-9 items-center rounded-md border border-foreground/15 px-3 text-sm"
                  >
                    <LogOut className="mr-1 inline h-4 w-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;


