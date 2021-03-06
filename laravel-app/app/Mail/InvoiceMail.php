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
     * The invoice instance.
     *
     * @var InvoicePeriod
     */
    public $period;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
        $this->period = \App\InvoicePeriod::find($this->invoice->period_id);
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

        $form = new \App\Lib\InvoiceForm();

        $subject = 'Račun za vadnino za mesec '.$months[$this->period->month - 1].'/'.$this->period->year;
        if( \Config::get('app.env') !== 'production'){
            $subject = '*** TEST *** '. $subject; 
        }
        

        return $this->from('info@nogomet-polzela.si')
            ->subject($subject)
            ->view('emails.invoice')
            ->with([
                'mesec' => $months[$this->period->month - 1],
                'leto' => $this->period->year,
                'dateNow' => date('d. '). $months[$this->period->month - 1].' '.$this->period->year,
                'dueDate' => '18. '.$months[$this->period->month - 1].' '.$this->period->year,
                'price' => number_format($this->invoice->price,2,',','.'),
                'reference1' => substr($this->invoice->reference, 0, 4),
                'reference2' => substr($this->invoice->reference, 4),
                'billNo' => substr($this->invoice->reference, 4, 12),
                'logo' => resource_path('images/ndp-logo.png') 
            ])
            ->attachData(
                $form->makeImage($this->period, $this->invoice), 
                'vadnina_'.$months[$this->period->month - 1].'_'.$this->period->year.'.png', [
                'mime' => 'image/png',
            ]);
    }
}
