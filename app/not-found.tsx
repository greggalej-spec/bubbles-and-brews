import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--cream-light)" }}
    >
      <div className="text-center px-8">
        <p className="text-[var(--gold-mid)] text-xs tracking-[0.3em] uppercase mb-6">
          Page not found
        </p>
        <h1
          className="font-display font-light text-[var(--charcoal)] leading-tight mb-6"
          style={{ fontSize: "var(--text-display)" }}
        >
          404
        </h1>
        <p className="text-[var(--charcoal-mid)] mb-10 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-wide hover:bg-[var(--gold-deep)] transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
