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
                        width="600" 
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
        
                                <p>pošiljamo vam položnico za plačilo vadnine za <b>{{$invoice->child_name}}</b> za mesec <b>{{$mesec}} {{$leto}}</b>.</p>
                                
                                <p>Lep pozdrav,</p>
                                
                                <p>Nogometno društvo Polzela</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
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


