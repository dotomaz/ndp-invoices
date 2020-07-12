<?php

namespace App\Lib;

use App\InvoicePeriod;
use App\Invoice;

class Importer {

    private $spreadsheetId = '1dfEnt3jQDAGY0rqPoZuaO72m3oyUv62KqNicIGudcRI';
    private $ranges = [
        7 => 'Vadnine U7!A5:O50',
        8 => 'Vadnine U8!A5:O50',
        9 => 'Vadnine U9!A5:O50',
        11 => 'Vadnine U11!A5:O50',
        13 => 'Vadnine U13!A5:O50',
        15 => 'Vadnine U15!A5:O50',
    ];

    public function process($period) {

        $invoicePeriod = InvoicePeriod::find($period);
        if( is_null($invoicePeriod) ) {
            throw new Exception("Invalid invoice period.");
        }

        foreach( $this->ranges as $team => $range ){
            echo "Uvažam <b>U$team</b>: ";
            $this->importTeam($period, $team, $invoicePeriod);
            echo "Done!<br>";
        }
    }

    private function importTeam($period, $team, $invoicePeriod) {

        $range = $this->ranges[$team];
        $googleSheets = new GoogleSheets();
        $values = $googleSheets->getSheetRange($this->spreadsheetId, $range);

        if (!empty($values)) {
            foreach ($values as $row) {
                $childName = $this->arr($row, 1). ' ' .$this->arr($row, 2);
                $reference = $this->getReference($this->arr($row, 0), $team, $invoicePeriod['month'], $invoicePeriod['year']);

                $invoice = Invoice::where('reference', $reference)->first();

                if( is_null($invoice) && strlen(trim($childName)) > 0 ) {
                    Invoice::create([
                        'period_id' => $invoicePeriod['id'],
                        'parent_name' => $this->arr($row, 10),
                        'child_name' => $childName,
                        'team' => $team,
                        'email' => $this->arr($row, 14),
                        'address' => $this->arr($row, 4),
                        'city' => $this->arr($row, 6),
                        'price' => $this->getPrice($team),
                        'discount' => 0,
                        'reference' => $reference, 
                    ]);
                    echo '. ';
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
        
        $res = 'SI00';
        $res .= $team < 10 ? '0'.$team : $team;
        $res .= $month < 10 ? '0'.$month : $month;
        $res .= $year;
        $res .= '-'. $numTxt;
        
        return $res;
    }    
    
    private function arr($arr, $index) {
        if( !empty($arr) && count($arr) > $index) {
            return $arr[$index];
        }
        return '';
    }
}