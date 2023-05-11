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
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => '1',
        ]);

        DB::table('lessons')->insert([
            ['title' => 'はじめまして'],
            ['title' => 'これから　お世話に　なります'],
            ['title' => 'これを　ください'],
            ['title' => 'そちらは　何時までですか'],
            ['title' => 'この電車は　甲子園へ　行きますか'],
        ]);

        DB::table('vocabularies')->insert([
            ['lesson_id' => '1', 'word' => 'わたし', 'meaning' => 'I'],
            ['lesson_id' => '1', 'word' => 'わたしたち', 'meaning' => 'we'],
            ['lesson_id' => '1', 'word' => 'あなた', 'meaning' => 'you'],
            ['lesson_id' => '1', 'word' => 'あのひと', 'meaning' => 'that person'],
            ['lesson_id' => '1', 'word' => 'あのかた', 'meaning' => '(polite) that person'],
            ['lesson_id' => '1', 'word' => 'せんせい', 'meaning' => 'teacher'],
            ['lesson_id' => '1', 'word' => 'がくせい', 'meaning' => 'student'],
            ['lesson_id' => '1', 'word' => 'かいしゃいん', 'meaning' => 'company employee'],
            ['lesson_id' => '1', 'word' => 'ぎんこういん', 'meaning' => 'bank employee'],
            ['lesson_id' => '1', 'word' => 'いしゃ', 'meaning' => 'medical doctor'],

            ['lesson_id' => '2', 'word' => 'これ', 'meaning' => 'this (near me)'],
            ['lesson_id' => '2', 'word' => 'それ', 'meaning' => 'that (near you)'],
            ['lesson_id' => '2', 'word' => 'あれ', 'meaning' => 'that (over there, away from both)'],
            ['lesson_id' => '2', 'word' => 'ほん', 'meaning' => 'book'],
            ['lesson_id' => '2', 'word' => 'じしょ', 'meaning' => 'dictionary'],
            ['lesson_id' => '2', 'word' => 'ざっし', 'meaning' => 'magazine'],
            ['lesson_id' => '2', 'word' => 'しんぶん', 'meaning' => 'newspaper'],
            ['lesson_id' => '2', 'word' => 'ノート', 'meaning' => 'notebook'],
            ['lesson_id' => '2', 'word' => 'めいし', 'meaning' => 'business card'],
            ['lesson_id' => '2', 'word' => 'カード', 'meaning' => 'card'],

            ['lesson_id' => '3', 'word' => 'ここ', 'meaning' => 'here'],
            ['lesson_id' => '3', 'word' => 'そこ', 'meaning' => 'there'],
            ['lesson_id' => '3', 'word' => 'あそこ', 'meaning' => 'over there'],
            ['lesson_id' => '3', 'word' => 'どこ', 'meaning' => 'where'],
            ['lesson_id' => '3', 'word' => 'こちら', 'meaning' => 'this way'],
            ['lesson_id' => '3', 'word' => 'そちら', 'meaning' => 'that way'],
            ['lesson_id' => '3', 'word' => 'あちら', 'meaning' => 'that way over there'],
            ['lesson_id' => '3', 'word' => 'どちら', 'meaning' => 'which way'],
            ['lesson_id' => '3', 'word' => 'きょうしつ', 'meaning' => 'classroom'],
            ['lesson_id' => '3', 'word' => 'しょくどう', 'meaning' => 'dining hall'],

            ['lesson_id' => '4', 'word' => 'デパート', 'meaning' => 'department store'],
            ['lesson_id' => '4', 'word' => 'ぎんこう', 'meaning' => 'bank'],
            ['lesson_id' => '4', 'word' => 'ゆうびんきょく', 'meaning' => 'post office'],
            ['lesson_id' => '4', 'word' => 'としょかん', 'meaning' => 'library'],
            ['lesson_id' => '4', 'word' => 'びじゅつかん', 'meaning' => 'art museum'],
            ['lesson_id' => '4', 'word' => 'いま', 'meaning' => 'now'],
            ['lesson_id' => '4', 'word' => 'なんじ', 'meaning' => 'what time'],
            ['lesson_id' => '4', 'word' => 'ごぜん', 'meaning' => 'morning'],
            ['lesson_id' => '4', 'word' => 'ごご', 'meaning' => 'afternoon'],
            ['lesson_id' => '4', 'word' => 'きのう', 'meaning' => 'yesterday'],

            ['lesson_id' => '5', 'word' => 'がっこう', 'meaning' => 'school'],
            ['lesson_id' => '5', 'word' => 'スーパー', 'meaning' => 'super market'],
            ['lesson_id' => '5', 'word' => 'えき', 'meaning' => 'station'],
            ['lesson_id' => '5', 'word' => 'ひこうき', 'meaning' => 'airplane'],
            ['lesson_id' => '5', 'word' => 'ふね', 'meaning' => 'ship'],
            ['lesson_id' => '5', 'word' => 'でんしゃ', 'meaning' => 'electric train'],
            ['lesson_id' => '5', 'word' => 'ちかてつ', 'meaning' => 'subway'],
            ['lesson_id' => '5', 'word' => 'バス', 'meaning' => 'bus'],
            ['lesson_id' => '5', 'word' => 'タクシー', 'meaning' => 'taxi'],
            ['lesson_id' => '5', 'word' => 'じてんしゃ', 'meaning' => 'bicycle'],
        ]);

        DB::table('grammars')->insert([
            // lesson 1
            ['lesson_id' => '1', 
            'structure' => 'は', 
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

            // lesson 2
            ['lesson_id' => '2', 
            'structure' => 'これ/それ/あれ', 
            'explanation' => 'これ，それ and あれ are demonstratives. They work as nouns. これ refers to a thing near the speaker. それ refers to a thing near the listener. あれ refers to a thing far from the speaker and the listener.', 
            'example' => 'それは　じしょですか。'],

            ['lesson_id' => '2', 
            'structure' => 'この N/その N/あの N', 
            'explanation' => 'この，その and あの modify nouns. このN refers to a thing or a person near the speaker. そのN refers to a thing or a person near the listener. あのN　refers to a thing or a person far from both the speaker and the listener.', 
            'example' => 'あの　かたは　どなた　ですか。'],

            ['lesson_id' => '2', 
            'structure' => 'A か, B か', 
            'explanation' => 'This is a question asking the listener to choose between alternatives, A and B. As an answer to this type of question, the chosen sentence is stated. Neither はい, nor いいえ is used.', 
            'example' => 'これは　[9]ですか、[7]ですか。'],

            // lesson 3
            ['lesson_id' => '3', 
            'structure' => 'A は B (place) です', 
            'explanation' => 'Using this sentence pattern, you can explain where a place, a thing or a person is.', 
            'example' => 'おてあらいは　あそこです。'],

            ['lesson_id' => '3', 
            'structure' => ' A の B', 
            'explanation' => 'In addition to the uses you learned about in lesson 1 and 2, の can also indicate where something was made. In this structure, どこ is used to ask where or by whom A is made.', 
            'example' => 'これは　どこの　コンビューターですか。'],
            
            ['lesson_id' => '3', 
            'structure' => 'どこ/どちら', 
            'explanation' => 'どこ means “where" and どちら means “which direction." どちら can also mean “where" in which case it is politer than どこ. どこ or どちら is also used to ask the name of a country, company, school or any place or organization a person belongs to.', 
            'example' => 'がっこうは　どこですか。'],

            // lesson 4
            ['lesson_id' => '4', 
            'structure' => 'に', 
            'explanation' => 'When a verb denotes a momentary action or movement, the time when it occurs is marked with the particle に.', 
            'example' => '6じはんに　おきます。'],

            ['lesson_id' => '4', 
            'structure' => 'AからBまで', 
            'explanation' => 'から indicates the starting time or place, and まで indicates the finishing time or place.', 
            'example' => '９じから　５じまで　はたらきます。'],

            ['lesson_id' => '4', 
            'structure' => 'AとB', 
            'explanation' => 'The particle と connects two nouns in coordinate relation.', 
            'example' => 'ぎんこうの　やすみは　どようびと　にちようび　です。'],

            // lesson 5
            ['lesson_id' => '5', 
            'structure' => 'へ', 
            'explanation' => 'When a verb indicates movement to a certain place, the particle へ is put after the place to show the direction of the move.', 
            'example' => 'きょうとへ　いきます。'],

            ['lesson_id' => '5', 
            'structure' => 'どこ[へ]も, なにも, だれも', 
            'explanation' => 'When an interrogative takes the particle も and the verb following it is negative, all that is represented by the interrogative is denied.', 
            'example' => 'どこ[へ]も　いきません。'],

            ['lesson_id' => '5', 
            'structure' => 'よ', 
            'explanation' => 'よ is placed at the end of a sentence. It is used to emphasize information which the listener does not know, or to show that you are giving your judgement or views assertively.', 
            'example' => 'ベーコンは　すごいですよ'],
        ]);

        DB::table('kanjis')->insert([
            // lesson 1
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

            ['lesson_id' => '1',
            'kanji' => '歳',
            'kunyomi' => 'せい',
            'onyomi' => 'サイ、セイ',
            'word' => '何歳'],

            // lesson 2
            ['lesson_id' => '2',
            'kanji' => '本',
            'kunyomi' => 'もと',
            'onyomi' => 'ホン',
            'word' => '日本'],

            ['lesson_id' => '2',
            'kanji' => '傘',
            'kunyomi' => 'かさ',
            'onyomi' => 'サン',
            'word' => '傘'],

            ['lesson_id' => '2',
            'kanji' => '車',
            'kunyomi' => 'くるま',
            'onyomi' => 'シャ',
            'word' => '電車'],

            // lesson 3
            ['lesson_id' => '3',
            'kanji' => '室',
            'kunyomi' => 'むろ',
            'onyomi' => 'シツ',
            'word' => '教室'],
            
            ['lesson_id' => '3',
            'kanji' => '食',
            'kunyomi' => 'た, く',
            'onyomi' => 'ショク, ジキ',
            'word' => '食堂'],

            ['lesson_id' => '3',
            'kanji' => '話',
            'kunyomi' => 'はんし,　はな',
            'onyomi' => 'ワ',
            'word' => '電話'],

            // lesson 4
            ['lesson_id' => '4',
            'kanji' => '起',
            'kunyomi' => 'お',
            'onyomi' => 'キ',
            'word' => '起きる'],

            ['lesson_id' => '4',
            'kanji' => '寝',
            'kunyomi' => 'ね',
            'onyomi' => 'シン',
            'word' => '寝る'],

            ['lesson_id' => '4',
            'kanji' => '時',
            'kunyomi' => 'とき',
            'onyomi' => 'ジ',
            'word' => '時間'],

            // lesson 5
            ['lesson_id' => '5',
            'kanji' => '学',
            'kunyomi' => 'まな',
            'onyomi' => 'ガク',
            'word' => '学生'],

            ['lesson_id' => '5',
            'kanji' => '帰',
            'kunyomi' => 'かえ',
            'onyomi' => 'キ',
            'word' => '帰る'],

            ['lesson_id' => '5',
            'kanji' => '歩',
            'kunyomi' => 'ある, あゆ, はか',
            'onyomi' => 'ホ、ブ、フ',
            'word' => '歩いて'],
        ]);

        DB::table('questions')->insert([
            // lesson 1
            ['id' => 1,
            'lesson_id' => '1',
            'question' => 'わたし means: ',
            't_ans' => 'I',
            'f_ans1' => 'you',
            'f_ans2' => 'teacher',
            'f_ans3' => 'student'],

            ['id' => 2,
            'lesson_id' => '1',
            'question' => 'ミラーさんは　かいしゃいん　です。グプタさん___　かいしゃいん　です。',
            't_ans' => 'も',
            'f_ans1' => 'で',
            'f_ans2' => 'と',
            'f_ans3' => 'は'],

            ['id' => 3,
            'lesson_id' => '1',
            'question' => 'How to read this kanji: 私',
            't_ans' => 'わたし',
            'f_ans1' => 'あなた',
            'f_ans2' => 'わたしたち',
            'f_ans3' => 'あのひと'],

            // lesson 2
            ['id' => 1,
            'lesson_id' => '2',
            'question' => '学生 means: ',
            't_ans' => 'student',
            'f_ans1' => 'you',
            'f_ans2' => 'teacher',
            'f_ans3' => 'I'],

            ['id' => 2,
            'lesson_id' => '2',
            'question' => '___　ほんは　わたしのです。',
            't_ans' => 'この',
            'f_ans1' => 'これ',
            'f_ans2' => 'こちら',
            'f_ans3' => 'どこ'],

            ['id' => 3,
            'lesson_id' => '2',
            'question' => 'How to read this kanji: 電車',
            't_ans' => 'でんしゃ',
            'f_ans1' => 'くるま',
            'f_ans2' => 'あるいて',
            'f_ans3' => 'ひこうき'],

            // lesson 3
            ['id' => 1,
            'lesson_id' => '3',
            'question' => 'あそこ means: ',
            't_ans' => 'over there',
            'f_ans1' => 'here',
            'f_ans2' => 'there',
            'f_ans3' => 'where'],

            ['id' => 2,
            'lesson_id' => '3',
            'question' => 'おてあらい___　あそこです。',
            't_ans' => 'は',
            'f_ans1' => 'と',
            'f_ans2' => 'の',
            'f_ans3' => 'へ'],

            ['id' => 3,
            'lesson_id' => '3',
            'question' => 'How to read this kanji: 食堂',
            't_ans' => 'しょくどう',
            'f_ans1' => 'しょくど',
            'f_ans2' => 'しょうくどう',
            'f_ans3' => 'しょうくど'],

            // lesson 4
            ['id' => 1,
            'lesson_id' => '4',
            'question' => 'ゆうびんきょく means: ',
            't_ans' => 'post office',
            'f_ans1' => 'library',
            'f_ans2' => 'art museum',
            'f_ans3' => 'bank'],

            ['id' => 2,
            'lesson_id' => '4',
            'question' => 'ぎんこうの　やすみは　どようび___　にちようび　です。',
            't_ans' => 'と',
            'f_ans1' => 'に',
            'f_ans2' => 'から',
            'f_ans3' => 'まで'],

            ['id' => 3,
            'lesson_id' => '4',
            'question' => 'How to read this kanji: 時間',
            't_ans' => 'じかん',
            'f_ans1' => 'なにじ',
            'f_ans2' => 'なんにじ',
            'f_ans3' => 'なんじ'],

            // lesson 5
            ['id' => 1,
            'lesson_id' => '5',
            'question' => 'ちかてつ means: ',
            't_ans' => 'subway',
            'f_ans1' => 'electric train',
            'f_ans2' => 'airplane',
            'f_ans3' => 'ship'],

            ['id' => 2,
            'lesson_id' => '5',
            'question' => '___　たべません。',
            't_ans' => 'なにも',
            'f_ans1' => 'どこも',
            'f_ans2' => 'だれも',
            'f_ans3' => 'いつも'],

            ['id' => 3,
            'lesson_id' => '5',
            'question' => 'How to read this kanji: 帰ります',
            't_ans' => 'かえります',
            'f_ans1' => 'かえます',
            'f_ans2' => 'かります',
            'f_ans3' => 'とります'],
        ]);
    }
}
