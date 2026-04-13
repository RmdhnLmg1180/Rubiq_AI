<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;

// Admin
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\InstructorApplicationsController;
use App\Http\Controllers\Admin\UsersController;

// Instructor
use App\Http\Controllers\Instructor\CourseController;
use App\Http\Controllers\Instructor\AssignmentController;
use App\Http\Controllers\Instructor\GradingController;

// Student
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\SubmissionController;

/*
|--------------------------------------------------------------------------
| Public Route
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Default Dashboard (Redirect berdasarkan role)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    $role = auth()->user()->role;

    return match ($role) {
        'admin' => redirect()->route('admin.dashboard'),
        'instructor' => redirect()->route('instructor.dashboard'),
        'student' => redirect()->route('student.dashboard'),
        default => abort(403),
    };
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // VIEW PROFILE
    Route::get('/profile', function () {
        return Inertia::render('Profile/Show');
    })->name('profile.show');

    // EDIT PROFILE
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/users', [UsersController::class, 'index'])
            ->name('users.index');

        Route::get('/instructor-applications', [InstructorApplicationsController::class, 'index'])
            ->name('instructor_applications.index');

        Route::post('/instructor-applications/{user}/approve', [InstructorApplicationsController::class, 'approve'])
            ->name('instructor_applications.approve');

        Route::post('/instructor-applications/{user}/reject', [InstructorApplicationsController::class, 'reject'])
            ->name('instructor_applications.reject');
         Route::get('/monitoring', function () {
            return Inertia::render('Admin/Monitoring/Index');
        })->name('monitoring.index');
    });


/*
|--------------------------------------------------------------------------
| INSTRUCTOR ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:instructor'])
    ->prefix('instructor')
    ->name('instructor.')
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Instructor/Dashboard');
        })->name('dashboard');

        // Courses (PENTING: ini fix error Ziggy kamu)
        Route::get('/courses', function () {
            return Inertia::render('Courses/Index');
        })->name('courses.index');

        // Assignments
        Route::get('/assignments', function () {
            return Inertia::render('Assignments/Index');
        })->name('assignments.index');

        // Grading (AI)
        Route::get('/grading/{submission}', [GradingController::class, 'show'])
            ->name('grading.show');

        Route::post('/grading/{submission}/publish', [GradingController::class, 'publish'])
            ->name('grading.publish');
            Route::get('/grading', function () {
    return Inertia::render('Instructor/Grading/Index');
})->name('grading.index');
    });

/*
|--------------------------------------------------------------------------
| STUDENT ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:student'])
    ->prefix('student')
    ->name('student.')
    ->group(function () {

        Route::get('/dashboard', [StudentDashboardController::class, 'index'])
            ->name('dashboard');

        Route::post('/submit', [SubmissionController::class, 'store'])
            ->name('submit');
            Route::get('/submissions', function () {
    return Inertia::render('Student/Submissions/Index');
})->name('submissions.index');
    });

/*
|--------------------------------------------------------------------------
| GENERAL LMS (Shared Pages)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/rubrics', function () {
        return Inertia::render('Rubrics/Index');
    })->name('rubrics.index');

    Route::get('/insights', function () {
        return Inertia::render('Insights/Index');
    })->name('insights.index');
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';