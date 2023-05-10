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
        $user_id = auth()->user()->id;

        $complete = DB::table('progress')
        ->select('progress.lesson_id')
        ->where([
            ['progress.done', '=', 1], 
            ['progress.user_id', '=', $user_id]
        ])
        ->get();

        if ($complete->isEmpty()) {
            return response()->json([
                'name' => $user->name,
                'email' => $user->email,
                'complete_lesson' => 0,
            ]);
        }

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

    public function accounts() {
        $accounts = User::all();
        return response()->json($accounts);
    }

    public function destroyAccount($id){
        $account = User::find($id);
        $account->delete();
        return response()->json("deleted");
    }
}
