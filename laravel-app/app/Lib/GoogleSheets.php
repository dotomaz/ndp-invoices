<?php

namespace App\Lib;

use Google_Client;
use Google_Service_Sheets;

class GoogleSheets {

    /**
     * Returns an authorized API client.
     * @return Google_Client the authorized client object
     */
    public function getClient()
    {
        $redirect_uri = $_SERVER['REQUEST_SCHEME']. '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        if( strpos($redirect_uri, '?') !== false ) {
            $redirect_uri = substr($redirect_uri, 0, strpos($redirect_uri, '?') );
        }

        $client = new Google_Client();
        $client->setApplicationName('Google Sheets API PHP Quickstart');
        $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
        $client->setAuthConfig(storage_path('app/credentials.json'));
        
        $client->setRedirectUri($redirect_uri);

        $authUrl = $client->createAuthUrl();

        if (isset($_GET['code'])) {
            $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
            
            $client->setAccessToken($token);
            session(['access_token' => $token]);

            throw new GoogleSheetAuthException($redirect_uri);
          }

        if(session('access_token', null) !== null) {
            $client->setAccessToken(session('access_token'));
            if ($client->isAccessTokenExpired()) {
                session(['access_token' => null]);
                throw new GoogleSheetAuthException($redirect_uri);
            }
        } else {
            throw new GoogleSheetAuthException($authUrl);
        }

        return $client;
    }

    public function getSheetRange($spreadsheetId, $range) {
        $client = $this->getClient();
        $service = new Google_Service_Sheets($client);

        $response = $service->spreadsheets_values->get($spreadsheetId, $range);
        return $response->getValues();
    }
    
}