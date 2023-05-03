<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LessonController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//lesson
Route::get('lessons', [LessonController::class, 'index']);
Route::get('lesson/{id}/vocabulary', [LessonController::class, 'viewVocabulary']);
Route::get('lesson/{id}/kanji', [LessonController::class, 'viewKanji']);
Route::get('lesson/{id}/grammar', [LessonController::class, 'viewGrammar']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('profile', [UserController::class,'show']);
    Route::post('profile', [UserController::class,'profileUpdate']);
    Route::post('logout', [AuthController::class, 'logout']);
});
