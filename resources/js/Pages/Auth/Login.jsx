import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PublicAuthLayout from '@/Layouts/PublicAuthLayout';

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
        title="Masuk ke RubriQ AI"
        subtitle="Lanjutkan mengelola rubrik, submission, dan feedback—lebih konsisten dan lebih mudah ditindaklanjuti."
      >
        {status && (
          <div className="mb-4 rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-800">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full rounded-2xl"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="nama@kampus.ac.id"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="password" value="Password" />
              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="text-xs font-extrabold text-slate-600 hover:text-slate-900"
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
              className="mt-1 block w-full rounded-2xl"
              autoComplete="current-password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Minimal 8 karakter"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <label className="flex items-center gap-2">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="text-sm font-semibold text-slate-700">Ingat saya</span>
          </label>

          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm font-extrabold text-slate-600 hover:text-slate-900"
            >
              ← Kembali
            </Link>

            <PrimaryButton className="rounded-2xl" disabled={processing}>
              {processing ? "Memproses..." : "Masuk"}
            </PrimaryButton>
          </div>

          <div className="pt-2 text-center text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link
              href={route("register")}
              className="font-extrabold text-slate-900 hover:underline"
            >
              Daftar
            </Link>
          </div>
        </form>
      </PublicAuthLayout>
    </>
  );
}