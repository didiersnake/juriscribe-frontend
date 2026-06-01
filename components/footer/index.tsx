export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-800 bg-slate-900 px-6 py-8 text-white">
      {/* Cool ambient glow matching the How It Works section */}
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-0 left-1/4 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-indigo-600/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-white drop-shadow-sm">
            JuriScribe
          </span>
          <span className="hidden text-sm text-slate-400 sm:inline-block">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="#"
            className="text-slate-300 transition-colors hover:text-blue-400"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-slate-300 transition-colors hover:text-blue-400"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-slate-300 transition-colors hover:text-blue-400"
          >
            Contact
          </a>
        </div>

        <span className="block text-center text-sm text-slate-400 sm:hidden">
          &copy; {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  )
}
