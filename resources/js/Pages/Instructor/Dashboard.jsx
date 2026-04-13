import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle,
    Clock,
    AlertCircle,
    BookOpen,
    Plus,
    Brain
} from 'lucide-react';

function StatCard({ title, value, icon: Icon, color, hint }) {
    return (
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>

                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {value}
                    </h3>
                    {hint && <p className="text-xs text-slate-400">{hint}</p>}
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    Dashboard Instructor
                </h2>
            }
        >
            <Head title="Dashboard Instructor" />

            <div className="space-y-8">

                {/* 🔵 HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-white shadow-lg">
                    <h1 className="text-2xl font-bold">
                        Teaching Workspace 🚀
                    </h1>
                    <p className="text-blue-100 text-sm mt-1">
                        Kelola kelas, tugas, dan penilaian AI dalam satu tempat.
                    </p>
                </div>

                {/* ⚡ QUICK ACTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href={route('instructor.courses.index')}
                        className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
                    >
                        <p className="text-sm text-slate-500">Kelola</p>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            Mata Kuliah
                        </h3>
                    </Link>

                    <Link
                        href={route('instructor.assignments.index')}
                        className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
                    >
                        <p className="text-sm text-slate-500">Buat</p>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            Assignment
                        </h3>
                    </Link>

                    <Link
                        href={route('instructor.dashboard')}
                        className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
                    >
                        <p className="text-sm text-slate-500">AI</p>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            Grading Workspace
                        </h3>
                    </Link>
                </div>

                {/* 📊 STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <StatCard
                        title="Perlu Direview"
                        value="24"
                        icon={Clock}
                        color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        hint="Draft AI siap"
                    />

                    <StatCard
                        title="Selesai Dinilai"
                        value="112"
                        icon={CheckCircle}
                        color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        hint="Minggu ini"
                    />

                    <StatCard
                        title="Terlambat"
                        value="5"
                        icon={AlertCircle}
                        color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        hint="Mahasiswa"
                    />
                </div>

                {/* 📚 COURSES */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Mata Kuliah Anda
                        </h3>

                        <Link
                            href={route('instructor.courses.index')}
                            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4" />
                            Buat Kelas
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="text-blue-500" />
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                    Manajemen Bisnis
                                </h4>
                            </div>

                            <p className="text-sm text-slate-500">
                                32 Mahasiswa
                            </p>

                            <div className="mt-4 text-xs text-slate-400">
                                3 tugas aktif
                            </div>

                            <div className="mt-4">
                                <Link
                                    href={route('instructor.courses.index')}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Lihat Detail →
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 🧠 AI SUBMISSIONS */}
                <div className="rounded-2xl bg-white dark:bg-slate-800 border shadow-sm">
                    <div className="p-5 border-b flex justify-between items-center">
                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-500" />
                            AI Submission Queue
                        </h3>

                        <Link
                            href={route('instructor.assignments.index')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="divide-y">

                        <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/40">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    Andi Saputra
                                </p>
                                <p className="text-sm text-slate-500">
                                    Esai Kelayakan Bisnis
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                Draft AI
                            </span>
                        </div>

                        <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/40">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    Siti Aminah
                                </p>
                                <p className="text-sm text-slate-500">
                                    Esai Kelayakan Bisnis
                                </p>
                            </div>

                            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 animate-pulse">
                                Diproses AI
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}