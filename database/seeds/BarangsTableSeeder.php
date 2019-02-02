<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BarangsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dt = Carbon::now();
        DB::table('barangs')->insert([
            'namabarang' => 'Baju Polos Putih',
            'jumlah' => '10',
            'created_at' => $dt->toDateTimeString(),
            'updated_at' => $dt->toDateTimeString(),
        ]);
        DB::table('barangs')->insert([
            'namabarang' => 'Baju Polos Merah',
            'jumlah' => '15',
            'created_at' => $dt->toDateTimeString(),
            'updated_at' => $dt->toDateTimeString(),
        ]);
        DB::table('barangs')->insert([
            'namabarang' => 'Baju Polos Biru',
            'jumlah' => '20',
            'created_at' => $dt->toDateTimeString(),
            'updated_at' => $dt->toDateTimeString(),
        ]);
    }
}
