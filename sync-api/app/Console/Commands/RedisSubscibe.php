<?php

namespace App\Console\Commands;

use App\Http\Controllers\CaptorController;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Predis;
use Superbalist\PubSub\Redis\RedisPubSubAdapter;

class RedisSubscibe extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'redis:subscribe';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'On va t\'attraper';

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
        
        $client = new Predis\Client([
            'scheme' => 'tcp',
            'host' => 'redis',
            'port' => 6379,
            'database' => 0,
            'read_write_timeout' => 0
        ]);
        
        $pubsub = $client->pubSubLoop();
        
        $pubsub->psubscribe('__key*__:*');

        foreach ($pubsub as $message) {
            switch ($message->kind) {
                case 'psubscribe':
                    echo "Subscribed to {$message->channel}", PHP_EOL;
                    break;
        
                case 'pmessage':
                    if ($message->channel == 'control_channel') {
                        if ($message->payload == 'quit_loop') {
                            echo 'Aborting pubsub loop...', PHP_EOL;
                            $pubsub->unsubscribe();
                        } else {
                            echo "Received an unrecognized command: {$message->payload}.", PHP_EOL;
                        }
                    } else if ($message->channel == '__keyevent@0__:set') {
                        echo "Received data : key =",
                             PHP_EOL, "  {$message->payload}", PHP_EOL;

                        echo "Received data : data =" ,
                             PHP_EOL, "  {$client->get($message->payload)}", PHP_EOL, PHP_EOL;
                        // $client->get($message->payload)
                        // insert content in mysql
                        
                    } else {
                        echo "Received the following message from {$message->channel}:",
                             PHP_EOL, "  {$message->payload}", PHP_EOL, PHP_EOL;
                    }
                    break;
            }
        }
        
        // Always unset the pubsub consumer instance when you are done! The
        // class destructor will take care of cleanups and prevent protocol
        // desynchronizations between the client and the server.
        unset($pubsub); 
    }
}