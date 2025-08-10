import { ShieldCheck, Ticket, BookOpen, Laptop, BadgeCheck, HeartHandshake } from "lucide-react";

const features = [
  {
    title: "Books & Notes",
    desc: "Find second-hand textbooks, notes, and study guides.",
    icon: BookOpen,
  },
  {
    title: "Electronics",
    desc: "Laptops, calculators, headphones, and more.",
    icon: Laptop,
  },
  {
    title: "Tickets & Events",
    desc: "College fests, clubs, and society events.",
    icon: Ticket,
  },
  {
    title: "Verified Community",
    desc: "Only students from your college can join.",
    icon: BadgeCheck,
  },
  {
    title: "Safe & Secure",
    desc: "Report and resolve issues quickly.",
    icon: ShieldCheck,
  },
  {
    title: "Student-to-Student",
    desc: "Connect directly and negotiate fairly.",
    icon: HeartHandshake,
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What you can do</h2>
          <p className="mt-2 text-foreground/70">Discover categories and features built for student life.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-foreground/10 bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-foreground/10 p-2">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


