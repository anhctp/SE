<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function show()
    {
        $user = Auth()->user();
        $complete = DB::table('users')
        ->join('progress', 'users.id', '=', 'progress.user_id')
        ->select('progress.lesson_id')
        ->where('progress.done', '=', 1)
        ->get();
        

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'complete_lesson' => $complete[0]->lesson_id,
        ]);
    }
    public function profileUpdate(Request $request) {
        $user = Auth()->user();
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'updated_at' => now()
        ]);
        return response()->json("Updated");
    }
}
