<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(App\User::class)->create(['email' => 'user@htsoft.com']);
        for ($i=0; $i < 10; $i++) { 
            $user->contacts()->save(factory(App\Contact::class)->make());
        }

        $users = factory(App\User::class, 3)->create();
        foreach ($users as $user) {
            $user->contacts()->save(factory(App\Contact::class)->make());
        }
    }    
}
