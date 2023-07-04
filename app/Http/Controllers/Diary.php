<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class Diary extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user(); //ログインユーザーの取得

        return Inertia::render('Diary/Show', compact('user'));

    }


}
