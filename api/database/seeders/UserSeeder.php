<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
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
        $admin1 = User::firstOrCreate(
            ['email' => 'admin@techshop.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Account',
                'email' => 'admin@techshop.com',
                'password' => bcrypt('Techshop@25'),
            ]
        );
        $admin1->assignRole([RoleEnum::ADMIN_ROLE]);
    }
}
