<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Goutte\Client as GouteClient;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Psr7\Request;

class ScrapeProductsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape all available products from https://sugargang.com/collections/alle-produkte';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $allProductUrl = 'https://sugargang.com/collections/alle-produkte';
        $client = new GouteClient();
        $crawler = $client->request('GET', $allProductUrl);
        $handles = [];

        $crawler->filter('.product-item')->each(function ($node) use (&$handles) {
            $handle = $node->filter('.product-item__image-wrapper')->attr('href');
            $handle = str_replace('/products/', '', $handle);
            $handles[] = $handle;
        });

        foreach ($handles as $handle) {
            $productUrl = 'https://sugargang.com/products/' . $handle;
            $guzzleClient = new GuzzleClient();
            $headers = [
            'Accept' => 'application/json'
            ];
            $request = new Request('GET', $productUrl, $headers);
            $res = $guzzleClient->sendAsync($request)->wait();
            $response = $res->getBody();
            $responseArray = json_decode($response, true);
            $product = new Product($responseArray);
            $product->save();
        }

        $this->info('Scraping completed!');
    }
}
