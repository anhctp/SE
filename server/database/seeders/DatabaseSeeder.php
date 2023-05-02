<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lesson;
use App\Models\Vocabulary;
use App\Models\Grammar;
use App\Models\Kanji;
use App\Models\Question;

use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        DB::table('lessons')->insert([
            ['title' => 'Lesson 1: はじめまして'],
            // ['title' => 'Lesson 2: これから　お世話に　なります'],
        ]);
        
        DB::table('vocabularies')->insert([
            ['lesson_id' => '1', 'word' => 'いきます', 'meaning' => 'đi'],
            ['lesson_id' => '1', 'word' => 'きます', 'meaning' => 'đến'],
            ['lesson_id' => '1', 'word' => 'かえります', 'meaning' => 'về'],
            ['lesson_id' => '1', 'word' => 'がっこう', 'meaning' => 'trường học'],
            ['lesson_id' => '1', 'word' => 'スーパー', 'meaning' => 'siêu thị'],
        ]);

        DB::table('grammars')->insert([
            ['lesson_id' => '1', 
            'structure' => 'Trợ từ へ', 
            'explanation' => 'Dùng để chỉ phương hướng. Thường đi với động từ chỉ sự di chuyển', 
            'example' => 'きのう　どこへ　いきましたか。'],

            ['lesson_id' => '1', 
            'structure' => 'Trợ từ は', 
            'explanation' => 'Danh từ trước は là chủ đề của câu. Dùng は để giới thiệu một đề tài mà người nói muốn đề cập đến', 
            'example' => 'わたしは　はたちです。'],
            
        ]);       

        DB::table('kanjis')->insert([
            ['lesson_id' => '1', 
            'kanji' => 'あの人', 
            'chinese_sound' => 'NHÂN', 
            'word' => 'あのひと'],

            ['lesson_id' => '1', 
            'kanji' => 'あの方', 
            'chinese_sound' => 'PHƯƠNG', 
            'word' => 'あのかた'],
        ]);   

        DB::table('questions')->insert([
            ['lesson_id' => '1',
            'question' => 'いきます nghĩa là: ',
            't_ans' => 'đi',
            'f_ans1' => 'đến',
            'f_ans2' => 'về',
            'f_ans3' => 'trường học'],

            ['lesson_id' => '1',
            'question' => 'きのう　どこ＿＿＿　いきましたか。',
            't_ans' => 'へ',
            'f_ans1' => 'で',
            'f_ans2' => 'と',
            'f_ans3' => 'は'],
            
        ]);  
    }
}
