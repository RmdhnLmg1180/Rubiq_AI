import React from "react";
import { Link } from "@inertiajs/react";

function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rqPlay2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="45%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <path
        d="M12 16c0-5 4-9 9-9h20c11 0 20 9 20 20v12c0 11-9 20-20 20H24c-11 0-20-9-20-20V16Z"
        fill="url(#rqPlay2)"
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
    </svg>
  );
}

function Sticker({ color = "bg-orange-100", title, desc }) {
  return (
    <div className={`rounded-3xl border border-black/10 ${color} p-4 shadow-sm`}>
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm leading-6 text-slate-700">{desc}</div>
    </div>
  );
}

function Illustration() {
  return (
    <div className="relative mt-8 rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="absolute -top-4 -left-4 h-16 w-16 rounded-3xl bg-orange-200/80 blur-[1px]" />
      <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-3xl bg-emerald-200/80 blur-[1px]" />

      <div className="flex items-center justify-between">
        <div className="text-sm font-extrabold text-slate-900">
          “Feedback Draft” yang enak dibaca
        </div>
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-extrabold text-slate-700">
          contoh
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-3xl border border-black/10 bg-slate-50 p-4">
          <div className="text-xs font-extrabold text-slate-700">
            Kriteria: Struktur Argumen
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Kuat di ide utama. Akan lebih rapi jika setiap paragraf punya “kalimat
            topik” yang jelas.
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-slate-50 p-4">
          <div className="text-xs font-extrabold text-slate-700">Next Steps</div>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
            <li>Tambahkan 1 contoh konkret.</li>
            <li>Rapikan transisi antar paragraf.</li>
            <li>Pastikan sesuai rubrik.</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-2 text-center text-sm font-extrabold text-slate-800">
            Edit
          </div>
          <div className="flex-1 rounded-2xl bg-slate-900 px-4 py-2 text-center text-sm font-extrabold text-white">
            Publish
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          AI bantu menyusun draft. Publikasi tetap oleh dosen.
        </div>
      </div>
    </div>
  );
}

export default function PublicAuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
        {/* Left */}
        <div className="relative overflow-hidden px-6 py-10 md:px-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-200/70 blur-3xl" />
          <div className="absolute top-10 -right-24 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3">
              <LogoMark />
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight text-slate-900">
                  RubriQ AI
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Feedback yang rapi & menyenangkan
                </div>
              </div>
            </Link>

            <div className="mt-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                {subtitle}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              <Sticker
                color="bg-orange-100"
                title="Lebih cepat"
                desc="Draft feedback otomatis—Anda tinggal review & edit."
              />
              <Sticker
                color="bg-pink-100"
                title="Lebih konsisten"
                desc="Feedback mengikuti rubrik (lebih adil dan jelas)."
              />
              <Sticker
                color="bg-emerald-100"
                title="Lebih terukur"
                desc="Dashboard merangkum progres & keterlambatan."
              />
            </div>

            <Illustration />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center px-6 py-10 md:px-10">
          <div className="w-full">
            <div className="rounded-[36px] border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
              {children}
            </div>
            <div className="mt-6 text-center text-xs font-semibold text-slate-500">
              Dengan melanjutkan, Anda menyetujui kebijakan penggunaan dan privasi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}