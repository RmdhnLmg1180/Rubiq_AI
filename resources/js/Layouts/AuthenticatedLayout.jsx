import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Brain,
    BarChart3,
    Users,
    Activity,   // ✅ tambahkan
    FileText    // ✅ tambahkan
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const role = user.role;

    const getMenuByRole = (role) => {
        if (role === "admin") {
            return [
                { name: "Dashboard", icon: LayoutDashboard, route: "admin.dashboard" },
                { name: "Manajemen User", icon: Users, route: "admin.users.index" },
                { name: "Approval Instructor", icon: ClipboardList, route: "admin.instructor_applications.index" },
                { name: "Monitoring System", icon: Activity, route: "admin.monitoring.index" },
            ];
        }

        if (role === "instructor") {
            return [
                { name: "Dashboard", icon: LayoutDashboard, route: "instructor.dashboard" },
                { name: "Mata Kuliah", icon: BookOpen, route: "instructor.courses.index" },
                { name: "Assignments", icon: FileText, route: "instructor.assignments.index" },
                { name: "Rubrik", icon: ClipboardList, route: "rubrics.index" },
                // ⚠️ jangan pakai grading.show (butuh parameter)
                { name: "Grading AI", icon: Brain, route: "instructor.grading.index" },
                { name: "Insight", icon: BarChart3, route: "insights.index" },
            ];
        }

        if (role === "student") {
            return [
                { name: "Dashboard", icon: LayoutDashboard, route: "student.dashboard" },
                { name: "Kelas Saya", icon: BookOpen, route: "student.dashboard" },
                { name: "Tugas", icon: ClipboardList, route: "student.dashboard" },
                { name: "Submissions", icon: FileText, route: "student.submissions.index" },
            ];
        }

        return [];
    };

    const menu = getMenuByRole(role);

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">

            {/* SIDEBAR */}
            <aside className={`
                fixed z-40 inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r
                transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
            `}>

                {/* LOGO */}
                <div className="h-16 flex items-center px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/images/Logo_Rubriq.png"
                            alt="RubriQ AI"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            RubriQ AI
                        </span>
                    </Link>
                </div>

                {/* ROLE LABEL */}
                <p className="px-6 text-xs text-slate-400 uppercase">
                    {role}
                </p>

                {/* MENU */}
                <nav className="p-4 space-y-2">
                    {menu.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={route(item.route)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition
                                ${
                                    route().current(item.route)
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* OVERLAY MOBILE */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* MAIN */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <header className="h-16 bg-white dark:bg-slate-800 border-b flex items-center justify-between px-6">
                    
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            ☰
                        </button>

                        {header}
                    </div>

                    {/* PROFILE */}
                    <div className="relative group">
                        <button className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <span className="hidden md:block text-sm font-medium dark:text-white">
                                {user.name}
                            </span>
                        </button>

                        {/* DROPDOWN */}
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-700 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition p-2">
                            
                            <Link
                                href={route('profile.edit')}
                                className="block px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg"
                            >
                                Settings
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}