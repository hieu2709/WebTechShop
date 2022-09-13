<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->double("price");
            $table->string("description")->nullable();
            $table->string("picture")->nullable();
            $table->boolean("is_disabled")->default(false);
            $table->foreignId("brand_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("product_type_id")->constrained()->onUpdate("cascade")->onDelete("cascade");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
