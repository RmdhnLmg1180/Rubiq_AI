import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PublicAuthLayout from "@/Layouts/PublicAuthLayout";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => () => reset("password"), []);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <>
      <Head title="Masuk" />

      <PublicAuthLayout
        title="Masuk ke LMS"
        subtitle="Kelola pembelajaran, tugas, dan penilaian dengan lebih mudah dan terstruktur."
      >
        {/* STATUS */}
        {status && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          
          {/* EMAIL */}
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-blue-400"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="masukkan email anda"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="password" value="Password" />
              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Lupa password?
                </Link>
              )}
            </div>

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-blue-400"
              autoComplete="current-password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Masukkan password"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          {/* REMEMBER */}
          <label className="flex items-center gap-2">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="text-sm text-slate-700">Ingat saya</span>
          </label>

          {/* ACTION */}
          <div className="space-y-3">
            <PrimaryButton
              className="w-full justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? "Memproses..." : "Masuk"}
            </PrimaryButton>

            <Link
              href="/"
              className="block text-center text-sm text-blue-600 hover:text-blue-800"
            >
              ← Kembali ke beranda
            </Link>
          </div>

          {/* REGISTER */}
          <div className="pt-2 text-center text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link
              href={route("register")}
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Daftar
            </Link>
          </div>

        </form>
      </PublicAuthLayout>
    </>
  );
}