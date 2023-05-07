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
            ['title' => 'はじめまして'],
            ['title' => 'これから　お世話に　なります'],
        ]);
        
        DB::table('vocabularies')->insert([
            ['lesson_id' => '1', 'word' => 'わたし', 'meaning' => 'I'],
            ['lesson_id' => '1', 'word' => 'あなた', 'meaning' => 'you'],
            ['lesson_id' => '1', 'word' => 'せんせい', 'meaning' => 'teacher'],
            ['lesson_id' => '1', 'word' => 'がくせい', 'meaning' => 'student'],
            ['lesson_id' => '1', 'word' => 'かいしゃいん', 'meaning' => 'company employee'],
        ]);

        DB::table('grammars')->insert([
            ['lesson_id' => '1', 
            'structure' => 'Particle は', 
            'explanation' => 'The particle は indicates that the word before it is the topic of the sentence. You select a noun you want to talk about, add は to show that it is the topic and give a statement about the topic.', 
            'example' => 'わたしは　マイク　ミラー です。'],

            ['lesson_id' => '1', 
            'structure' => 'です', 
            'explanation' => 'Nouns used with です work as predicates. です indicates judgement or assertion.', 
            'example' => 'わたしは　エンジニア　です。'],

            ['lesson_id' => '1', 
            'structure' => 'も', 
            'explanation' => 'も is added after a topic instead of はwhen the statement about the topic is the same as the previous topic.', 
            'example' => 'ミラーさんは　かいしゃいん　です。グプタさんも　かいしゃいん　です。'],
            
        ]);       

        DB::table('kanjis')->insert([
            ['lesson_id' => '1', 
            'kanji' => '私', 
            'kunyomi' => 'わたし, わたくし', 
            'onyomi' => 'シ',
            'word' => '私'],

            ['lesson_id' => '1', 
            'kanji' => '人', 
            'kunyomi' => 'ひと', 
            'onyomi' => 'ジン, ニン',
            'word' => 'あのひと'],
        ]);   

        DB::table('questions')->insert([
            ['lesson_id' => '1',
            'question' => 'わたし means: ',
            't_ans' => 'I',
            'f_ans1' => 'you',
            'f_ans2' => 'teacher',
            'f_ans3' => 'student'],

            ['lesson_id' => '1',
            'question' => 'ミラーさんは　かいしゃいん　です。グプタさん___　かいしゃいん　です。',
            't_ans' => 'も',
            'f_ans1' => 'で',
            'f_ans2' => 'と',
            'f_ans3' => 'は'],
            
        ]);  
    }
}
