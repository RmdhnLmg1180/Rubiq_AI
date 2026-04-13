import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, UserCheck, Clock, Shield, Activity } from 'lucide-react';

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ auth, counts, latestPending }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Admin Dashboard
        </h2>
      }
    >
      <Head title="Admin Dashboard" />

      <div className="space-y-8">

        {/* 🔵 HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">Control Center</h1>
          <p className="mt-1 text-blue-100 text-sm">
            Kelola seluruh sistem RubriQ AI secara terpusat.
          </p>
        </div>

        {/* ⚡ QUICK ACCESS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={route('admin.users.index')}
            className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500">Manajemen</p>
            <h3 className="font-semibold text-slate-900 dark:text-white">Users</h3>
          </Link>

          <Link
            href={route('admin.instructor_applications.index')}
            className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500">Approval</p>
            <h3 className="font-semibold text-slate-900 dark:text-white">Instructor</h3>
          </Link>

          <Link
            href={route('admin.monitoring.index')}
            className="rounded-2xl p-4 bg-white border hover:shadow-md transition dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500">System</p>
            <h3 className="font-semibold text-slate-900 dark:text-white">Monitoring</h3>
          </Link>
        </div>

        {/* 📊 STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total User"
            value={counts.users_total}
            icon={Users}
            color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          />

          <StatCard
            title="Student"
            value={counts.students_total}
            icon={UserCheck}
            color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          />

          <StatCard
            title="Instructor"
            value={counts.instructors_total}
            icon={Shield}
            color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
          />

          <StatCard
            title="Pending"
            value={counts.pending_instructor_applications}
            icon={Clock}
            color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          />
        </div>

        {/* 📌 ACTIVITY + TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - TABLE */}
          <div className="lg:col-span-2 rounded-3xl border bg-white dark:bg-slate-800">
            <div className="p-5 border-b flex justify-between">
              <h3 className="font-semibold">Pengajuan Instruktur</h3>
              <Link
                href={route('admin.instructor_applications.index')}
                className="text-blue-600 text-sm"
              >
                Lihat semua →
              </Link>
            </div>

            <div className="p-4">
              {latestPending.length === 0 ? (
                <p className="text-sm text-slate-500">Tidak ada data</p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {latestPending.map((u) => (
                      <tr key={u.id} className="border-b">
                        <td className="py-2 font-medium">{u.name}</td>
                        <td>{u.email}</td>
                        <td className="text-right">
                          <Link
                            href={route('admin.instructor_applications.index')}
                            className="text-blue-600 text-xs"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* RIGHT - ACTIVITY */}
          <div className="rounded-3xl border bg-white p-5 dark:bg-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Aktivitas Sistem</h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>• User baru mendaftar</li>
              <li>• Instructor mengajukan permohonan</li>
              <li>• Sistem AI berjalan normal</li>
              <li>• Tidak ada error kritis</li>
            </ul>
          </div>

        </div>

      </div>
    </AuthenticatedLayout>
  );
}