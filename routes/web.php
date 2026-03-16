<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\InstructorApplicationController;
use App\Http\Controllers\Admin\InstructorApplicationsController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\UsersController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Semua user yang sudah verified masuk ke dashboard utama.
// Admin akan diarahkan ke /admin/dashboard
Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Apply instructor harus verified (OTP selesai dulu)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/instructor/apply', [InstructorApplicationController::class, 'create'])
        ->name('instructor.apply');

    Route::post('/instructor/apply', [InstructorApplicationController::class, 'store'])
        ->name('instructor.apply.store');
});

// Admin area
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/instructor-applications', [InstructorApplicationsController::class, 'index'])
        ->name('instructor_applications.index');

    Route::post('/instructor-applications/{user}/approve', [InstructorApplicationsController::class, 'approve'])
        ->name('instructor_applications.approve');

    Route::post('/instructor-applications/{user}/reject', [InstructorApplicationsController::class, 'reject'])
        ->name('instructor_applications.reject');

    Route::get('/users', [UsersController::class, 'index'])
        ->name('users.index');
});

require __DIR__.'/auth.php';