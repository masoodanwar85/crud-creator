<?php

namespace App\Http\Controllers;

use App\Models{{entity}};
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return User::all();
    }
}
