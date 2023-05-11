<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->foreignId('lesson_id')->references('id')->on('lessons');
            $table->text('question');
            $table->text('t_ans');
            $table->text('f_ans1');
            $table->text('f_ans2');
            $table->text('f_ans3');
            $table->primary(['id', 'lesson_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};