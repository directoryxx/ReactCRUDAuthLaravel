<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dt = Carbon::now();

        DB::table('users')->insert([
            'name' => 'Anak Agung Angga Wijaya',
            'email' => 'angga@gmail.com',
            'password' => bcrypt('password'),
            'created_at' => $dt->toDateTimeString(),
            'updated_at' => $dt->toDateTimeString(),
        ]);
    }
}
