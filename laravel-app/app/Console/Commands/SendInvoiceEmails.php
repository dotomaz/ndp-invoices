<?php

namespace App\Console\Commands;

use App\Invoice;
use Illuminate\Console\Command;

class SendInvoiceEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:invoice';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send invoices that are marked to be sent.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $invoices = Invoice::where("should_send", 1)
            ->where('sent', 0)
            ->get();

        // dump($invoices);

        $invoices->map(function($invoice) {
            // dump($invoice);
            echo "Sending email for ". $invoice->child_name ." ... ";
            \Mail::to('tomaz@dobrisek.si')->queue(new \App\Mail\InvoiceMail($invoice));

            $invoice->sent = 1;
            $invoice->sent_date = date('Y-m-d H:i:s');
            $invoice->save();

            echo "OK\n";
        });

        return 0;
    }
}
