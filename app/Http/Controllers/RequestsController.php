<?php

namespace App\Http\Controllers;

use App\Forms;
use App\Acheter;

use Illuminate\Http\Request;

class RequestsController extends Controller
{
    public function form($type)
    {
        $formType = "forms." . $type;

        return view($formType);
    }


    public function store(Request $request)
    {
        $formData = $request->all();

        // $forms = Forms::create($formData);
        // $acheter = Acheter::create($formData);

        // $acheter->forms()->associate($forms);
        // $acheter->save();

        return $request;
    }
}
