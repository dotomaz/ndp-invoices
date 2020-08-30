<?php

namespace App\Lib;

use App\InvoicePeriod;
use App\Invoice;

class Importer {

    private $spreadsheetId = '1dfEnt3jQDAGY0rqPoZuaO72m3oyUv62KqNicIGudcRI';
    private $range = 'Vadnine!A3:O130';

    public function process($period) {

        $invoicePeriod = InvoicePeriod::find($period);
        if( is_null($invoicePeriod) ) {
            throw new Exception("Invalid invoice period.");
        }

        echo "Uvažam podatke: <br>";
        $this->importTeam($period, $invoicePeriod);
        echo "Done!<br>";
    }

    private function importTeam($period, $invoicePeriod) {

        $googleSheets = new GoogleSheets();
        $values = $googleSheets->getSheetRange($this->spreadsheetId, $this->range);

        if (!empty($values)) {
            foreach ($values as $row) {
                $num = $this->arr($row, 0);
                $team = preg_replace('#[^0-9]#', '', $this->arr($row, 1));
                $childName = $this->arr($row, 2). ' ' .$this->arr($row, 3);
                $reference = $this->getReference($this->arr($row, 0), $team, $invoicePeriod['month'], $invoicePeriod['year']);

                $invoice = Invoice::where('reference', $reference)->first();

                if (strlen(trim($childName)) > 0) {

                    try {
                        if( empty(trim($childName)) ) throw new \Exception("Ime otroka ni vpisano (".$num.")");
                        if( empty($this->arr($row, 10)) ) throw new \Exception("Ime starša ni vpisano (".$num.")");
                        if( empty($this->arr($row, 14)) ) throw new \Exception("Email ni vpisan (".$num.")");
                        if( !filter_var($this->arr($row, 14), FILTER_VALIDATE_EMAIL) ) throw new \Exception("Email ni veljaven (".$num.")");
                    } catch ( \Exception $ex) {
                        echo "<br>Napaka: <b>". $ex->getMessage() ."</b><br>";
                    }

                    if ( is_null($invoice) ) {
                        Invoice::create([
                            'period_id' => $invoicePeriod['id'],
                            'parent_name' => $this->arr($row, 10),
                            'child_name' => $childName,
                            'team' => $team,
                            'email' => $this->arr($row, 14),
                            'address' => $this->arr($row, 5),
                            'city' => $this->arr($row, 7),
                            'price' => $this->getPrice($team),
                            'discount' => 0,
                            'reference' => $reference, 
                        ]);
                        echo '+ ';
                    } else {
                        $invoice->period_id = $invoicePeriod['id'];
                        $invoice->parent_name = $this->arr($row, 10);
                        $invoice->child_name = $childName;
                        $invoice->team = $team;
                        $invoice->email = $this->arr($row, 14);
                        $invoice->address = $this->arr($row, 5);
                        $invoice->city = $this->arr($row, 7);
                        $invoice->save();
                        echo '° ';
                    }
                }
                
                
            }
        }
    }

    private function getPrice($team) {
        
        switch($team) {
            case 7:
            case 8:
                return 30;
            default:
                return 35;
        }
    }  
    
    private function getReference($num, $team, $month, $year) {
        
        $numTxt = "$num";
        while(strlen($numTxt) < 4) {
            $numTxt = '0' . $numTxt;
        }
        
        $res = $team < 10 ? '0'.$team : $team;
        $res .= $month < 10 ? '0'.$month : $month;
        $res .= $year;
        $res .= $numTxt;
        
        return 'SI12'. $this->addChecksumToReference($res);
    }

    private function addChecksumToReference($reference){
        $ponders = [2,3,4,5,6,7,8,9,10,11,12,13];
        $tt = array_map(
            function($el) {
                return (int) $el;
            },
            str_split($reference)
        );
        $cnt = count($tt);
        $sum = 0;

        for($i=$cnt-1, $j=0; $i>=0; $i--, $j++){
            $sum += $tt[$i]*$ponders[$j];
        }

        $rest = 11 - $sum % 11;
        $tt[] = $rest < 10 ? $rest : 0;
        return implode('', $tt);
    }
    
    private function arr($arr, $index) {
        if( !empty($arr) && count($arr) > $index) {
            return $arr[$index];
        }
        return '';
    }
}
