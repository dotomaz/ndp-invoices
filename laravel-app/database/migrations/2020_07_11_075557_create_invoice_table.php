<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoiceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_periods', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->smallInteger('month')->default(0);
            $table->smallInteger('year')->default(0);
            $table->timestamps();
        });
        
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('period_id');
            $table->string('parent_name')->nullable();
            $table->string('child_name',255)->nullable();
            $table->smallInteger('team')->default(0);
            $table->string('email',255)->nullable();
            $table->string('address',255)->nullable();
            $table->string('city',255)->nullable();
            $table->double('price',8,2)->default(0);
            $table->double('discount',8,2)->default(0);
            $table->string('reference',255)->nullable();
            $table->smallInteger('should_send')->default(0);
            $table->smallInteger('sent')->default(0);
            $table->timestamp('sent_date')->nullable();
            $table->timestamps();

            $table->foreign('period_id')
                ->references('id')->on('invoice_periods');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoice');
        Schema::dropIfExists('invoice_period');
    }
}
