<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DiaryController extends Controller
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function index(Request $request)
    {
        return Inertia::render('Diary/Index');
    }

    /**
     * Undocumented function
     *
     * @return void
     */
    public function store(Request $request)
    {

    }

}
