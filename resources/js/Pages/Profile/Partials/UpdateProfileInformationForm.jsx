import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const [preview, setPreview] = useState(user.profile_photo_url);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            forceFormData: true, // 🔥 penting untuk upload file
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and photo.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                {/* ================= FOTO PROFIL ================= */}
                <div className="flex items-center gap-4">
                    <img
                        src={preview || '/images/default-avatar.png'}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover border"
                    />

                    <div>
                        <InputLabel value="Photo" />

                        <input
                            type="file"
                            className="mt-2 text-sm"
                            onChange={handlePhotoChange}
                        />

                        <InputError message={errors.photo} className="mt-2" />
                    </div>
                </div>

                {/* ================= NAME ================= */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* ================= EMAIL ================= */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* ================= VERIFY EMAIL ================= */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Email belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 underline text-sm text-blue-600"
                            >
                                Kirim ulang
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm text-green-600">
                                Link verifikasi telah dikirim.
                            </div>
                        )}
                    </div>
                )}

                {/* ================= BUTTON ================= */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Simpan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Berhasil disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}