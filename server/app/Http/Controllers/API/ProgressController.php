<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Progress;
use App\Models\Answer;


class ProgressController extends Controller
{
    //
    public function addAnswer($id, $question_id, Request $request)
    {
        $user_id = Auth()->user()->id;
        $answer = new Answer();
        $answer->user_id = $user_id;
        
        $answer->lesson_id = $id;
        $answer->question_id = $question_id;
        $answer->answer = $request->answer;
        $answer->save();
        
        // return response()->json([
        //     'lesson_id' => $id,
        //     'question_id' => $question_id,
        //     'answer' => $request->answer,
        // ]);
    }

    public function addProgress($id, $user_id, $progress) {
        $progress = new Progress();
        $progress->user_id = $user_id;
        $progress->lesson_id = $id;
        $progress->score = 0;
        $progress->done = '0';
        
        $progress->save();
    }

    public function check($id, $question_id, Request $request) {
        $user_id = auth()->user()->id;
        $user_answer = $request->answer;
        $this->addAnswer($id, $question_id, $request);

        $answer = DB::table('questions')
            ->select('questions.t_ans')
            ->where('questions.id', '=', $question_id)
            ->get();
        
        $progress = Progress::where('user_id', $user_id)->first();
        if(is_null($progress)) {
            $progress = new Progress();
            $progress->user_id = $user_id;
            $progress->lesson_id = $id;
            $progress->score = 0;
            $progress->done = '0';
            
            $progress->save();
        } 
        if ($user_answer === $answer[0]->t_ans) {
            $progress->score = $progress->score + 1;
            $progress->update();
            // return true;
            $question_num = DB::table('questions')
            ->where('questions.lesson_id', '=', $id)
            ->count();
            if($progress->score == $question_num) {
                $progress->done = 1;
                $progress->update();
            }  
            return response()->json([
                // 'lesson_id' => $id,
                'question_id' => $question_id,
                'answer' => $request->answer,
                'score' => $progress->score,
            ]);
        } else {
            // return false;
            return response()->json([
                // 'lesson_id' => $id,
                'question_id' => $question_id,
                'user_answer' => $request->answer,
                'answer' => $answer[0]->t_ans,
                // 'score' => $progress->score,
            ]);
        }
    }
    // public function addProgress($id, $question_id, Request $request) {
    //     $user_id = Auth()->user()->id;
    //     $progress = Progress::where('user_id', $user_id)->first();
    //     if ($this->check($id ,$question_id, $request) && $progress->score == '2') {
    //         $progress = new Progress();
    //         $progress->user_id = $user_id;
    //         $progress->lesson_id = $id;
    //         $progress->done = '1';
    //         $progress->save();
    //     }
    //     return response()->json([
    //         'lesson_id' => $id,
    //         'question_id' => $question_id,
    //         'answer' => $request->answer,
    //         'score' => $progress->score,
    //     ]);
    // }
}