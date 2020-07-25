<?php

namespace App\Mail;

use App\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The invoice instance.
     *
     * @var Invoice
     */
    public $invoice;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // dump($this->invoice);
        $months = ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'];
        $period = \App\InvoicePeriod::find($this->invoice->period_id);

        $form = new \App\Lib\InvoiceForm();

        $subject = 'ND Polzela vadnina za mesec '.$months[$period->month - 1].'_'.$period->year;
        if( \Config::get('app.env') !== 'production'){
            $subject = '*** TEST *** '. $subject; 
        }
        

        return $this->from('info@nogomet-polzela.si')
            ->subject($subject)
            ->view('emails.invoice')
            ->with([
                'mesec' => $months[$period->month - 1],
                'leto' => $period->year,
                'price' => number_format($this->invoice->price,2,',','.'),
                'reference1' => substr($this->invoice->reference, 0, 4),
                'reference2' => substr($this->invoice->reference, 4),
                'logo' => resource_path('images/ndp-logo.png') 
            ])
            ->attachData(
                $form->makeImage($this->invoice), 
                'vadnina_'.$months[$period->month - 1].'_'.$period->year.'.png', [
                'mime' => 'image/png',
            ]);
    }
}
