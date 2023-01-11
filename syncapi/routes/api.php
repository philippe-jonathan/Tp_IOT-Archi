<?php
use App\WebSocketHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use BeyondCode\LaravelWebSockets\Facades\WebSocketsRouter;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

 Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
     return $request->user();
 });

Route::apiResource('/captor', 'CaptorController');

Route::get('/', function(){
     return "home";
});

WebSocketsRouter::webSocket('/socket', \App\Http\Controllers\WebSocketController::class);


// here for test, should be deleted before export
// Route::get('/', function(){
//     //return "caca";
//     return DB::connection("dbcloud")->table("captor")->get();
//     return DB::connection(env("DBCLOUD_NAME"))->table("captor")->get();
// });

