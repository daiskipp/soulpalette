<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
//use App\Http\Controllers\MoodtrackerController;
use App\Http\Controllers\Moodtracker;
use App\Http\Controllers\Diary;
use App\Http\Controllers\TestController;
use App\Actions\LoginUsingWeb3;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');




Route::post('login-web3', LoginUsingWeb3::class);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/diary', Diary::class)->name('diary');
    Route::get('/moodtracker', Moodtracker::class)->name('moodtracker');
    Route::get('/test', [TestController::class, 'index'])->name('test');


});
