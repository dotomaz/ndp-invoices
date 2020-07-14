<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class ApiController extends Controller
{

    public function loginAction(Request $request) {

        try{
            $googleSheets = new \App\Lib\GoogleSheets();
            $googleSheets->getClient();

            echo "Login ok";

            if( !empty(session('local_redirect_url', null)) ){
                $url = session('local_redirect_url');
                session(['local_redirect_url', $null]);
                return redirect($url);
            }

        }catch (\App\Lib\GoogleSheetAuthException $ex) {
            dump($request->session()->all());
            echo '<a href="'.$ex->getMessage().'">Login</a>';
            // return redirect($ex->getMessage());
        }
    }

    public function importDataAction(Request $request, $periodId) {

        try{
            $importer = new \App\Lib\Importer();
            $importer->process($periodId);
        }catch (\App\Lib\GoogleSheetAuthException $ex) {
            $redirect_uri = $_SERVER['REQUEST_SCHEME']. '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            session(['local_redirect_url', $redirect_uri]);
            return redirect('/api/login');
        }
    }

    public function invoiceFormAction(Request $request, $invoiceId) {

        $form = new \App\Lib\InvoiceForm();
        $form->generate($invoiceId);

    }

    
}
