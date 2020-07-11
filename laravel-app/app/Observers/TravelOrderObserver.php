<?php

namespace App\Observers;

use App\TravelOrder;

class TravelOrderObserver
{
    /**
     * Handle the travel order "created" event.
     *
     * @param  \App\TravelOrder  $travelOrder
     * @return void
     */
    public function created(TravelOrder $travelOrder)
    {
        //
        $cnt = TravelOrder::whereYear('created_at', '=', date('Y'))->count();
        $number = str_pad($cnt, 6, '0', STR_PAD_LEFT) . date('-Y');
        $travelOrder->number = $number;
        $travelOrder->save();
    }

    /**
     * Handle the travel order "updated" event.
     *
     * @param  \App\TravelOrder  $travelOrder
     * @return void
     */
    public function updated(TravelOrder $travelOrder)
    {
        //
        
    }

    /**
     * Handle the travel order "deleted" event.
     *
     * @param  \App\TravelOrder  $travelOrder
     * @return void
     */
    public function deleted(TravelOrder $travelOrder)
    {
        //
    }

    /**
     * Handle the travel order "restored" event.
     *
     * @param  \App\TravelOrder  $travelOrder
     * @return void
     */
    public function restored(TravelOrder $travelOrder)
    {
        //
    }

    /**
     * Handle the travel order "force deleted" event.
     *
     * @param  \App\TravelOrder  $travelOrder
     * @return void
     */
    public function forceDeleted(TravelOrder $travelOrder)
    {
        //
    }
}
