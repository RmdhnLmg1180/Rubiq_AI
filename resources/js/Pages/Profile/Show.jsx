import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Profile() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="max-w-4xl mx-auto space-y-6">

                {/* CARD */}
                <div className="bg-white p-6 rounded-2xl shadow">

                    {/* FOTO PROFIL */}
                    <div className="flex items-center gap-4">
                        <img
                            src={user.profile_photo_url}
                            className="w-24 h-24 rounded-full object-cover border"
                        />

                        <div>
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* BUTTON EDIT */}
                    <div className="mt-6">
                        <Link
                            href={route('profile.edit')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Edit Profile
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}