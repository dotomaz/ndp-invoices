<?php

namespace App\GraphQL\Mutations;

use App\Invoice;

class SendEmailToInvoice
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try{
            if (!empty($args['id'])) {
                Invoice::find($args['id'])
                    ->update(['should_send' => 1]);
    
                return ['success' => 1];
            }

            return['success' => 0, 'message' => 'Invoice ID must be provided.'];

        } catch(\Exception $ex) {
            return ['success' => 0, 'message' => $ex->getMessage()];
        }
    }
}
