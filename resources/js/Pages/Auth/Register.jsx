import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PublicAuthLayout from '@/Layouts/PublicAuthLayout';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <>
      <Head title="Daftar" />

      <PublicAuthLayout
        title="Buat akun anda sekarang juga"
        subtitle="Mulai dari yang sederhana: join kelas, lihat rubrik, submit tugas, dan terima feedback yang jelas serta actionable."
      >
        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="name" value="Nama lengkap" />
            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full rounded-2xl"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nama Anda"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full rounded-2xl"
              autoComplete="username"
              onChange={(e) => setData("email", e.target.value)}
              placeholder="nama@kampus.ac.id"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full rounded-2xl"
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Minimal 8 karakter"
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" value="Konfirmasi password" />
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full rounded-2xl"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              placeholder="Ulangi password"
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <div className="space-y-3">
            <PrimaryButton
                          className="w-full justify-center rounded-xl bg-blue hover:bg-white-800 dark:bg-Blue dark:text-blue dark:hover:bg-white-200"
                          disabled={processing}
                        >
                          {processing ? "Memproses..." : "Masuk"}
            </PrimaryButton>
            <Link
                          href="/"
                          className="block text-center text-blue-600 hover:text-blue-800 
                          dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          ← Kembali ke beranda
                        </Link>
          </div>
          <div className="pt-2 text-center text-sm text-slate-600">
            Saya sudah punya akun{" "}
            <Link
              href={route("login")}
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          </div>
          <div className="pt-2 text-center text-xs font-semibold text-slate-500">
            Setelah daftar, Anda bisa join kelas menggunakan <b>class code</b>.
          </div>
        </form>
      </PublicAuthLayout>
    </>
  );
}