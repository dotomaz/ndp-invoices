<?php

namespace App\Lib;

use App\Invoice;
use App\InvoicePeriod;
use Imagine\Gd\Imagine;
use Imagine\Image\Point;
use Endroid\QrCode\QrCode;

class InvoiceForm {

    public function generate($invoiceId) {
        $invoice = Invoice::find($invoiceId);
        $period = InvoicePeriod::find($invoice['period_id']);
        // dump([$invoice, $period]); die;
        header('Content-Type: image/png');
        echo $this->makeImage($period, $invoice);
    }

    public function makeImage($period, $invoice) {
        $month = $period['month'] < 10 ? '0'.$period['month'] : $period['month'];
        $year = $period['year'];

        $data = [
            'iban' => 'SI56 0510 0801 5399 5187',
            'znesek' => "***". number_format($invoice['price'],2, ',', '.'),
            'znesekRaw' => $invoice['price'],
            'namen' => "Vadnina ".$invoice['child_name']." ".$month."/".$year,
            'namen2' => "Vadnina ".$invoice['child_name']."\n".$month."/".$year,
            'kodaNamena' => "OTHR",
            'rok' => "18.".$month.".".$year."",
            'modul' => substr($invoice['reference'], 0, 4),
            'referenca' => substr($invoice['reference'], 4),
            'prejemnik' => explode(';', 'Nogometno društvo Polzela;Malteška cesta 38;3313 Polzela'),
            'placnik' => [
                $invoice['parent_name'],
                $invoice['address'],
                $invoice['city']
            ]
        ];

        
        $imagine = new Imagine();
        $image = $imagine->open(storage_path('app/poloznica.png'));

        $qrCodeImage = $imagine->load($this->getQRCode($data));

        $black = $image->palette()->color("000");
        $font = $imagine->font(storage_path('app/courbd.ttf'), 17, $black);
        $font2 = $imagine->font(storage_path('app/cour.ttf'), 14, $black);

        $image->paste($qrCodeImage, new Point(525, 60));

        $image->draw()->text($data['placnik'][0], $font2, new Point(40, 75));
        $image->draw()->text($data['placnik'][1], $font2, new Point(40, 100));
        $image->draw()->text($data['placnik'][2], $font2, new Point(40, 125));
        $image->draw()->text($data['namen2']."\nrok plačila: ". $data['rok'], $font2, new Point(40, 205));
        $image->draw()->text($data['znesek'], $font2, new Point(140, 315));
        $image->draw()->text($data['iban'], $font2, new Point(40, 382));
        $image->draw()->text($data['modul'].' '.$data['referenca'], $font2, new Point(40, 485));
        $image->draw()->text($data['prejemnik'][0], $font2, new Point(40, 555));
        $image->draw()->text($data['prejemnik'][1], $font2, new Point(40, 580));
        $image->draw()->text($data['prejemnik'][2], $font2, new Point(40, 605));

        $image->draw()->text($data['placnik'][0], $font, new Point(890, 200));
        $image->draw()->text($data['placnik'][1], $font, new Point(890, 240));
        $image->draw()->text($data['placnik'][2], $font, new Point(890, 280));

        $image->draw()->text($data['znesek'], $font, new Point(967, 360));
        $image->draw()->text($data['kodaNamena'], $font, new Point(576, 430));
        $image->draw()->text($data['namen'] .", rok plač. ". $data['rok'], $font, new Point(716, 430));
        $image->draw()->text($data['iban'], $font, new Point(530, 506));
        $image->draw()->text($data['modul'], $font, new Point(530, 571));
        $image->draw()->text($data['referenca'], $font, new Point(670, 571));

        $image->draw()->text($data['prejemnik'][0], $font, new Point(530, 640));
        $image->draw()->text($data['prejemnik'][1], $font, new Point(530, 680));
        $image->draw()->text($data['prejemnik'][2], $font, new Point(530, 720));

        return $image->get('png');
    }

    function getQRCode($data) {

        $qrCode = new QrCode($this->getQRCodeString($data));
        $qrCode->setSize(320);
        $qrCode->setMargin(0); 
        $qrCode->setWriterByName('png');
        $qrCode->setEncoding('ISO-8859-2');

        return $qrCode->writeString();

    }

    function getQRCodeString($data) {

        $qrZnesek = ''.round($data['znesekRaw'] * 100);
        while (strlen($qrZnesek) < 11) { $qrZnesek = '0'. $qrZnesek; }

        $qrData = [
            "UPNQR", // 1
            "", // 2
            "", // 3
            "", // 4
            "", // 5
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['placnik'][0]), // 6
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['placnik'][1]), // 7
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['placnik'][2]), // 8
            $qrZnesek, // 9
            "", // 10
            "", // 11
            $data['kodaNamena'], // 12
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['namen']), // 13
            $data['rok'], // 14
            str_replace(' ', '', $data['iban']), // 15
            $data['modul'] . $data['referenca'], // 16
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['prejemnik'][0]), // 17
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['prejemnik'][1]), // 18
            iconv('UTF-8', 'ISO-8859-2//TRANSLIT', $data['prejemnik'][2]), // 19
        ];

        $len = $this->qrDataLength($qrData);
        $qrData[] = $len < 100 ? '0'. $len : $len;

        $qrString = iconv('ISO-8859-2','UTF-8', implode("\n", $qrData). $this->getPadding($qrData));
        return $qrString;
    }

    private function qrDataLength($qrData){
        $arr = array_splice($qrData, 0, 19);
        $sum = 0;

        foreach($arr as $line) {
            $sum += strlen($line);
        }

        return $sum + 19;
    }

    private function getPadding($qrData){
        $arr = array_splice($qrData, 0, 20);
        $sum = 0;

        foreach($arr as $line) {
            $sum += strlen($line);
        }

        $sum += 20;

        $len = 411 - $sum;

        $res = '';
        while(strlen($res) < $len) { $res .= ' '; }

        return $res;
    }
}
