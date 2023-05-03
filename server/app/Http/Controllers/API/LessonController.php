<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function index(){
        $lessons = Lesson::all();
        return response()->json($lessons);
    }
    public function viewVocabulary($id) {
        $result = DB::table('lessons')
            ->join('vocabularies', 'lessons.id', '=', 'vocabularies.lesson_id')
            ->select('lessons.title', 'vocabularies.word', 'vocabularies.meaning')
            ->where('lessons.id', '=', $id)
            ->get();
        return response()->json($result);
    }

    public function viewKanji($id) {
        $result = DB::table('lessons')
            ->join('kanjis', 'lessons.id', '=', 'kanjis.lesson_id')
            ->select('lessons.title', 'kanjis.kanji', 'kanjis.kunyomi', 'kanjis.onyomi', 'kanjis.word')
            ->where('lessons.id', '=', $id)
            ->get();
        return response()->json($result);
    }
    public function viewGrammar($id) {
        $result = DB::table('lessons')
            ->join('grammars', 'lessons.id', '=', 'grammars.lesson_id')
            ->select('lessons.title', 'grammars.structure', 'grammars.explanation', 'grammars.example')
            ->where('lessons.id', '=', $id)
            ->get();
        return response()->json($result);
    }
}
