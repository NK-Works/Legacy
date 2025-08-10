export type Product = {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  condition: "new" | "like-new" | "good" | "fair";
  vendorId: string;
  vendorName: string;
  location: string;
  postedAt: string; // ISO date
  utilityHighlights: string[];
};

export const products: Product[] = [
  {
    id: "1",
    title: "Calculus Textbook (7th Ed.)",
    price: 450,
    images: ["/window.svg", "/file.svg", "/globe.svg"],
    category: "Books",
    description:
      "Well-maintained calculus textbook ideal for first-year engineering and science students. Minimal markings, includes appendix with solved examples.",
    condition: "good",
    vendorId: "u_alex",
    vendorName: "Alex Sharma",
    location: "Hostel A, Room 214",
    postedAt: new Date().toISOString(),
    utilityHighlights: [
      "Covers single and multivariable calculus",
      "Helpful for exams and competitive prep",
      "Lightweight and easy to carry",
    ],
  },
  {
    id: "2",
    title: "Used MacBook Air M1 (2020)",
    price: 58000,
    images: ["/globe.svg", "/next.svg", "/vercel.svg"],
    category: "Electronics",
    description:
      "M1 MacBook Air 8GB/256GB. Great battery life, perfect for coding, notes, and presentations. Includes charger and sleeve.",
    condition: "like-new",
    vendorId: "u_neha",
    vendorName: "Neha Gupta",
    location: "Library Block",
    postedAt: new Date().toISOString(),
    utilityHighlights: [
      "Fast compile times and smooth multitasking",
      "Silent, fanless design ideal for classrooms",
      "Long battery life for day-long lectures",
    ],
  },
  {
    id: "3",
    title: "Noise Cancelling Headphones",
    price: 3500,
    images: ["/vercel.svg", "/next.svg", "/window.svg"],
    category: "Electronics",
    description:
      "Comfortable over-ear headphones with active noise cancellation. Great for libraries and hostels.",
    condition: "good",
    vendorId: "u_neha",
    vendorName: "Neha Gupta",
    location: "Cafeteria",
    postedAt: new Date().toISOString(),
    utilityHighlights: [
      "Block ambient noise while studying",
      "Clear mic for online classes",
      "Foldable, travel-friendly design",
    ],
  },
  {
    id: "4",
    title: "Freshers' Night Ticket",
    price: 299,
    images: ["/file.svg", "/globe.svg"],
    category: "Events",
    description:
      "One entry ticket to the Freshers' Night. Early bird pricing, limited availability.",
    condition: "new",
    vendorId: "u_alex",
    vendorName: "Alex Sharma",
    location: "Student Activity Center",
    postedAt: new Date().toISOString(),
    utilityHighlights: [
      "Access to main stage and food stalls",
      "Skip the queue with early entry",
      "Transferable within your college",
    ],
  },
];


