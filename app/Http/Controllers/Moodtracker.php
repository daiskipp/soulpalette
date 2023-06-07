<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class Moodtracker extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user(); //ログインユーザーの取得
        //dd($user);
        return Inertia::render('MoodTracker/Show', compact('user'));
    }
}
