<html>
    <head>

    </head>
    <body style="
        margin: 0; 
        padding: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        font-size: 16px;
        background-color: #f8f8f8f8;
        "
    >
        <table width="100%" border="0" cellspacing="0" ceellpadding="0">
            <tr>
                <td height="50" colspan="3"></td>
            </tr>
            <tr>
                <td width="50%"></td>
                <td>
        
                    <table 
                        width="800" 
                        border="0" 
                        cellspacing="0" 
                        ceellpadding="0"
                        style="
                            background-color: #ffffff; 
                            padding: 25px; 
                            border-radius: 10px;
                            line-height: 1.5;
                        "
                    >
                        
                        <tr>
                            <td>
                                <p>Pozdravljeni,</p>
        
                                <p>pošiljamo vam račun za plačilo vadnine za <b>{{$invoice->child_name}}</b> za mesec <b>{{$mesec}} {{$leto}}</b>.</p>

                                <p>
                                    <b>Izdajatelj</b>:<br>
                                    Nogometno društvo Polzela<br>
                                    Malteška cesta 38<br>
                                    3313 Polzela<br>
                                    Davčna številka: 90383524<br>
                                    TRR: SI56 0510 0801 5399 518​<br>
                                </p>

                                <p>
                                    <b>Prejemnik</b>:<br>
                                    {{$invoice->parent_name}}<br>
                                    {{$invoice->address}}<br>
                                    {{$invoice->city}}
                                </p>

                                <p>
                                    <b>Številka</b>: {{$billNo}}<br>
                                    <b>Datum izdaje</b>: {{$dateNow}}<br>
                                    <b>Rok plačila</b>: {{$dueDate}} 
                                </p>

                                <p>
                                    Znesek <b>{{$price}} EUR</b> prosimo nakažite na 
                                    TRR <b>SI56 0510 0801 5399 518</b>. <br>
                                    Kot sklic pa vnesite
                                    <b>{{$reference1}} {{$reference2}}</b>.
                                </p>
                                
                                <table width="100%" style="text-align: left; border-collapse: collapse; border-left: 1px solid #000000; border-top: 1px solid #000000;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Opis</th>
                                            <th style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000; ">Osnova [€]</th>
                                            <th style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Davek [%]</th>
                                            <th style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Cena [€]</th>
                                            <th style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Količina</th>
                                            <th style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Znesek [€]</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="text-align: left; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Vadnina U{{$invoice->team}} {{$mesec}} {{$leto}}</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">{{$price}}</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">0</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">{{$price}}</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">1</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">{{$price}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">Skupni znesek:</td>
                                            <td style="text-align: right; padding:3px 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000;">{{$price}}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p>
                                    V skladu s 1. odstavkom 94. členom Zakona o davku na dodano vrednost (ZDDV-1) <br>
                                    nismo zavezanec za DDV.
                                </p>

                                <p>
                                    Lep pozdrav,<br />
                                    Nogometno društvo Polzela
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br />
                                <img src="{{ $message->embed($logo) }}">
                            </td>
                        </tr>
                    </table>
        
                </td>
                <td width="50%"></td>
            </tr>
            <tr>
                <td height="50" colspan="3"></td>
            </tr>
        </table>
    </body>
</html>
