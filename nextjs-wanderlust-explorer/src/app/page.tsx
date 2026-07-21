import Link from "next/link";

export default function Home() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-[-10rem] h-64 w-64 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-amber-100 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-6xl items-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-wide text-orange-800">
            Wanderlust Labs
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Discover unforgettable experiences around the world.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Browse curated adventures, cultural gems, food routes, wellness
            escapes, and nature moments from cities across the globe.
          </p>
          <div className="pt-2">
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Experiences
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
