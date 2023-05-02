<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show()
    {
        $user = Auth()->user();

        return response()->json([
            'name' => $user->name,
            'email' => $user->email
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
