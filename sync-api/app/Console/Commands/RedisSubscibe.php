<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

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
        // Redis::psubscribe(['__key*__:*'], function($message){
        //     echo $message;
        // });
        $client = new Predis\Client([
            'scheme' => 'tcp',
            'host' => 'redis',
            'port' => 6379,
            'database' => 0,
            'read_write_timeout' => 0
        ]);
        
        $adapter = new \Superbalist\PubSub\Redis\RedisPubSubAdapter($client);
        
        // consume messages
        // note: this is a blocking call
        // $adapter->subscribe('my_channel', function ($message) {
        //     var_dump($message);
        // });
        
        try{
            $adapter->connect('redis', 6379);
            echo "ok";
        }catch{
            echo "not ok";
        }
    }
}
