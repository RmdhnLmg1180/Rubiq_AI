import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardList,
    CheckCircle,
    Clock,
    FileText
} from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                    Halo,{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                        {auth.user.name}
                    </span>
                </h2>
            }
        >
            <Head title="Dashboard Student" />

            <div className="space-y-8">

                {/* ================== STATS ================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                <BookOpen />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Kelas Diikuti</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    5
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600">
                                <Clock />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Tugas Belum Selesai</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    3
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                <CheckCircle />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Tugas Selesai</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    12
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ================== KELAS ================== */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Kelas Saya
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* CARD */}
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border shadow-sm hover:shadow-lg transition">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="text-blue-500" />
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                    Manajemen Bisnis
                                </h4>
                            </div>

                            <p className="text-sm text-slate-500">
                                Dosen: Budi Santoso
                            </p>

                            <div className="mt-4 text-xs text-slate-400">
                                3 tugas aktif
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================== TUGAS ================== */}
                <div className="rounded-2xl bg-white dark:bg-slate-800 border shadow-sm">
                    <div className="p-5 border-b flex justify-between items-center">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                            Tugas Terbaru
                        </h3>

                        <button className="text-sm text-blue-600 hover:underline">
                            Lihat Semua
                        </button>
                    </div>

                    <div className="divide-y">

                        {/* ITEM */}
                        <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    Esai Kelayakan Bisnis
                                </p>
                                <p className="text-sm text-slate-500">
                                    Deadline: 20 Mei 2026
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                                Belum Dikerjakan
                            </span>
                        </div>

                        <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    Analisis Studi Kasus
                                </p>
                                <p className="text-sm text-slate-500">
                                    Deadline: 18 Mei 2026
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                Sudah Submit
                            </span>
                        </div>

                        <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    Laporan Akhir
                                </p>
                                <p className="text-sm text-slate-500">
                                    Deadline: 15 Mei 2026
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                Sudah Dinilai
                            </span>
                        </div>

                    </div>
                </div>

                {/* ================== SUBMISSION ================== */}
                <div className="rounded-2xl bg-white dark:bg-slate-800 border shadow-sm">
                    <div className="p-5 border-b">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                            Riwayat Submission
                        </h3>
                    </div>

                    <div className="p-5 text-sm text-slate-500">
                        Kamu sudah mengumpulkan 12 tugas. Teruskan progres belajarmu 🚀
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}