<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements MustVerifyEmailContract
{
    use HasFactory, Notifiable, MustVerifyEmail;

    // Gabungan dari semua $fillable
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'instructor_status',
        'instructor_application',
        'instructor_applied_at',
        'instructor_reviewed_at',
        'instructor_reviewed_by',
        'instructor_review_note',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Gabungan dari semua $casts
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'instructor_application' => 'array',
            'instructor_applied_at' => 'datetime',
            'instructor_reviewed_at' => 'datetime',
        ];
    }

    // Fungsi Notifikasi OTP
    public function sendEmailVerificationNotification()
    {
        app(\App\Services\EmailOtpService::class)->send($this);
    }

    // Fungsi-fungsi Role / Instruktur
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isInstructor(): bool
    {
        return $this->role === 'instructor';
    }

    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    public function isInstructorApproved(): bool
    {
        return $this->role === 'instructor' && $this->instructor_status === 'approved';
    }
}