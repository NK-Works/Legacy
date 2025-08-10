import ProductCard from "@/components/marketplace/ProductCard";
import { products } from "./data";

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Marketplace</h1>
          <p className="text-foreground/70">Browse popular listings from your campus.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search items..."
            className="h-10 rounded-md border border-foreground/15 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          />
          <select className="h-10 rounded-md border border-foreground/15 bg-background px-3 text-sm">
            <option value="all">All categories</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="events">Events</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


