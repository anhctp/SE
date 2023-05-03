<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Flashcard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class FlashcardController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
           'front' => 'required|string|max:100',
           'back' => 'required|string|max:100',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $hashedTooken = $request->bearerToken();
            $token = PersonalAccessToken::findToken($hashedTooken);
            $user = $token->tokenable;

            $newFlashcard = new Flashcard();
            $newFlashcard->front =$request->front;
            $newFlashcard->back =$request->back;
            $newFlashcard->user_id = $user->id;
            $newFlashcard->save();
            return response()->json('Added');
        }
    }
    public function show() {
        $userId = Auth()->user()->id;
        $flashcards = Flashcard::where('user_id', $userId)->get();
        return response()->json([$flashcards]);
    }
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'front' => 'required|string|max:100',
            'back' => 'required|string|max:100',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = Auth()->user();

            $flashcard = Flashcard::where('user_id', $user->id)->find($id);
            $flashcard->front =$request->front;
            $flashcard->back =$request->back;
            $flashcard->user_id = $user->id;
            $flashcard->update();
            return response()->json('Updated');
        }
    }
    public function destroy($id) {
        $flashcard =Flashcard::find($id);
        $flashcard->delete();
        return response()->json("Deleted");
    }
}
