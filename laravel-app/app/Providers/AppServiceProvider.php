<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use App\TravelOrder;
// use App\Observers\TravelOrderObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        // TravelOrder::observe(TravelOrderObserver::class);
    }
}
