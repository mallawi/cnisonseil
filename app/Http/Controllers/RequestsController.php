<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RequestsController extends Controller
{
    public function form()
    {
        return view("form");
    }
}