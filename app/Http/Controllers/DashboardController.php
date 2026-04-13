<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'review' => 24,
                'completed' => 112,
                'late' => 5,
                'trend' => [12, 19, 10, 15, 22],
            ],
            'activities' => [
                [
                    'name' => 'Andi',
                    'task' => 'Esai Bisnis',
                    'status' => 'Draft AI',
                ],
                [
                    'name' => 'Siti',
                    'task' => 'Manajemen Proyek',
                    'status' => 'Diproses AI',
                ],
            ],
        ]);
    }
}
