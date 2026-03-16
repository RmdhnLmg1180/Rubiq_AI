import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rqPlay" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="45%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <path
        d="M12 16c0-5 4-9 9-9h20c11 0 20 9 20 20v12c0 11-9 20-20 20H24c-11 0-20-9-20-20V16Z"
        fill="url(#rqPlay)"
      />
      <path
        d="M22 24h18c4.4 0 8 3.6 8 8s-3.6 8-8 8H31l-6 7h-3v-7h0V24Z"
        fill="white"
        fillOpacity="0.92"
      />
      <path
        d="M28 29h9.5c2.5 0 4.5 2 4.5 4.5S40 38 37.5 38H28v-9Z"
        fill="#0b1020"
        fillOpacity="0.85"
      />
      <path
        d="M18 18c3-2 7-3 10-2"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoodleBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/70 blur-3xl" />
      <div className="absolute top-10 -right-24 h-72 w-72 rounded-full bg-pink-200/70 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />

      {/* Dots pattern */}
      <svg
        className="absolute left-0 top-0 h-full w-full opacity-[0.25]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.5" fill="#0f172a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.08" />
      </svg>

      {/* Wavy line */}
      <svg
        className="absolute -bottom-10 left-0 w-[1200px] opacity-30"
        viewBox="0 0 1200 200"
        aria-hidden="true"
      >
        <path
          d="M0 120c120-80 240-80 360 0s240 80 360 0 240-80 360 0"
          fill="none"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />
        <path
          d="M0 160c120-80 240-80 360 0s240 80 360 0 240-80 360 0"
          fill="none"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-sm font-extrabold text-slate-700 hover:bg-white/70 hover:text-slate-900"
    >
      {children}
    </a>
  );
}

function SoftPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-extrabold text-slate-700 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {children}
    </span>
  );
}

export default function PublicLayout({ title, children }) {
  const { auth } = usePage().props;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Head title={title ?? "RubriQ AI"} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:shadow"
      >
        Lewati ke konten
      </a>

      <div className="relative min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
        <DoodleBg />

        {/* ✅ STICKY NAVBAR */}
        <header className="sticky top-0 z-40">
          {/* extra soft “glass” band behind navbar */}
          <div
            className={[
              "border-b border-black/5",
              "bg-white/55 backdrop-blur",
              scrolled ? "shadow-sm" : "",
            ].join(" ")}
          >
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <div
                className={[
                  "flex items-center justify-between rounded-3xl border border-black/10 px-4 py-3",
                  "bg-white/75 backdrop-blur",
                  scrolled ? "shadow-sm" : "shadow-[0_10px_30px_-30px_rgba(0,0,0,0.35)]",
                ].join(" ")}
              >
                <Link href="/" className="flex items-center gap-3">
                  <LogoMark className="h-9 w-9" />
                  <div className="leading-tight">
                    <div className="text-sm font-extrabold tracking-tight text-slate-900">
                      RubriQ AI
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      Feedback yang rapi & menyenangkan
                    </div>
                  </div>
                </Link>

                <nav className="hidden items-center md:flex">
                  <NavLink href="#fitur">Fitur</NavLink>
                  <NavLink href="#alur">Alur</NavLink>
                  <NavLink href="#mvp">MVP</NavLink>
                </nav>

                <div className="flex items-center gap-2">
                  {auth?.user ? (
                    <>
                      <SoftPill>{auth.user.name}</SoftPill>
                      <Link
                        href={route("dashboard")}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-slate-800"
                      >
                        Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={route("login")}
                        className="hidden rounded-2xl px-4 py-2 text-sm font-extrabold text-slate-700 hover:bg-white/70 sm:inline-flex"
                      >
                        Masuk
                      </Link>
                      <Link
                        href={route("register")}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-slate-800"
                      >
                        Daftar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main id="main" className="relative z-10">
          {children}
        </main>

        <footer className="relative z-10 mt-16 border-t border-black/5 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <LogoMark className="h-8 w-8" />
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    RubriQ AI
                  </div>
                  <div className="text-xs text-slate-500">
                    Rubrik → Draft → Review → Publish → Insight
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <a className="hover:text-slate-800" href="#">
                  Terms
                </a>
                <a className="hover:text-slate-800" href="#">
                  Privacy
                </a>
                <span className="hidden md:inline">•</span>
                <span>© {new Date().getFullYear()} RubriQ AI</span>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-black/10 bg-gradient-to-r from-orange-50 via-white to-emerald-50 p-6">
              <div className="flex flex-wrap gap-2">
                <SoftPill>Human-in-the-loop</SoftPill>
                <SoftPill>Rubrik konsisten</SoftPill>
                <SoftPill>Insight progres</SoftPill>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                RubriQ AI membantu menyusun <i>draft</i> feedback yang rapi;
                keputusan akhir tetap pada dosen sebelum dipublikasikan.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}