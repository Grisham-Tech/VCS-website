export default function CourseLoading() {
  return (
    <div
      className="hero-background min-h-[70vh] px-4 py-16 sm:px-8"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="h-4 w-56 rounded bg-white/15" />
            <div className="h-12 max-w-xl rounded bg-white/15" />
            <div className="h-5 max-w-lg rounded bg-white/10" />
            <div className="h-5 max-w-md rounded bg-white/10" />
            <div className="h-11 w-44 rounded-full bg-orange-300/25" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 rounded-2xl border border-white/10 bg-slate-950/30"
              />
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading course...</span>
    </div>
  );
}
