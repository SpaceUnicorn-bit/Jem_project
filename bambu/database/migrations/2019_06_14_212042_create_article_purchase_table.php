<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlePurchaseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_purchase', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->timestamps();
            $table->Integer('article_id')->unsigned(); 
            $table->Integer('purchase_id')->unsigned(); 

            $table->foreign('article_id')->references('id')->on('articles');
            $table->foreign('purchase_id')->references('id')->on('purchase');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_purchase');
    }
}
