<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function test()
    {
        // $invoice = \App\Invoice::find(1);

        // //\Mail::to('tomaz@dobrisek.si')->queue(new \App\Mail\InvoiceMail($invoice));

        // return (new \App\Mail\InvoiceMail($invoice))->render();
    }
}
