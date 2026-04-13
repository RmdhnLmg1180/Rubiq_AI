import React from "react";
import { Link } from "@inertiajs/react";

function LogoMark({ className = "h-12 w-auto object-contain" }) {
  return (
    <img
      src="/images/Logo_Rubriq.png"
      alt="RubriQ AI"
      className={className}
    />
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
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-white via-blue-50 to-blue-100 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
      px-6">

      {/* BOX / CARD */}
      <div className="w-full max-w-md">

        <div className="bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-700 rounded-3xl p-8 shadow-lg backdrop-blur">

          {/* LOGO */}
          <div className="flex flex-col items-center text-center mb-6">
            <LogoMark className="h-12 w-12 mb-3" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              RubriQ AI
            </h1>
          </div>

          {/* TITLE */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {subtitle}
            </p>
          </div>

          {/* FORM */}
          {children}

        </div>

        {/* FOOTER */}
        <p className="mt-6 text-xs text-center text-slate-500 dark:text-slate-400">
          Dengan melanjutkan, Anda menyetujui kebijakan penggunaan dan privasi.
        </p>

      </div>
    </div>
  );
}