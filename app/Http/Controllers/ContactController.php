<?php

namespace App\Http\Controllers;

use App\User;
use App\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auth = auth()->user();
        if (!$auth) {
            return response()->json(['error' => 'veillez vous connecté SVP.'], 401);
        }
        
        $contacts = $auth->contacts;
        // Faire le trie pour une récuperation normal
        $contacts = $contacts->sortBy('last_name')->values();
        
        return response()->json($contacts, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());

        /** @var User */
        $auth = auth()->user();

        $request->validate([
            'first_name' => 'required|string|min:2',
            'last_name' => 'required|string|min:2',
            'email' => 'required|string|email|unique:contacts,email',
            'phone' => 'required|string',
            'address' => 'string',
        ]);

        /** @var Contact */
        $contact = $auth->contacts()->create($request->all());
        return response()->json($contact->getAttributes(), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /** @var User */
        $auth = auth()->user();
        // dd($request->all());
        $request->validate([
            'first_name' => 'required|string|min:2',
            'last_name' => 'required|string|min:2',
            'email' => 'required|string|email|unique:contacts,email,'.$id,
            'phone' => 'required|string',
            'address' => 'string',
        ]);
        
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());
        return response()->json($contact->refresh()->getAttributes(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json($contact->getAttributes(), 200);
    }
}
