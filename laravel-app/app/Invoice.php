<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'period_id',
        'parent_name',
        'child_name',
        'team',
        'email',
        'address',
        'city',
        'price',
        'discount',
        'reference',
        'should_send',
        'sent',
        'sent_date',
    ];

    //
    public function period(): BelongsTo
    {
        return $this->belongsTo(InvoicePeriod::class, 'period_id');
    }

}
