import Image from "next/image";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="group rounded-xl border border-foreground/10 bg-background overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square w-full bg-foreground/5">
        <Image
          src={product.images?.[0] ?? "/window.svg"}
          alt={product.title}
          fill
          className="object-cover dark:invert"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-foreground/60">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 font-medium text-foreground">{product.title}</h3>
        <div className="mt-2 flex items-center gap-1 text-sm font-semibold">
          <IndianRupee className="h-4 w-4" />
          {product.price}
        </div>
      </div>
    </Link>
  );
}


