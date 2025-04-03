<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MBence\OpenTBSBundle\Services\OpenTBS;
use App\Models\Facture;
use Carbon\Carbon;
use DateTime;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Facture::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(isset($request['id'])&&$request['id']>0){
            $facture = Facture::find($request['id']);
            $facture->update(MyFunction::audit($request->all()));
            return response()->json([
                'message' => "La facture a été mise à jour",
                'status' => 200
            ], 200);
        }
        Facture::create(MyFunction::audit($request->all()));
        return response()->json([
            'message' => 'Ajout d\'une nouvelle facture',
            'status' => 200
        ], 200);
    }
    /**
     * Création des factures d'une période données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function nouvelle(Request $request)
    {
        $factures = Facture::where('periode', '=', $request['periode'])->get();
        if (count($facture) > 0) {
            return response()->json([
                'message' => "Il existe déjà des factures générées à cette période",
                'status' => 200
            ], 403);
        }
        $clients = Client::all();
        $tarifs = Tarif::all();
        $setTarifs = [];
        foreach ($tarif as $tarifs) {
            $setTarifs[$tarif->typetarif] = $tarif;
        }
        foreach ($client as $clients) {
            Facture::create(MyFunction::audit([
                'client_id'=> $client->id,
                'nom'=>$client->nom,
                'prenom'=>$client->prenom,
                'periode'=>$client->periode,
                'ancienindex'=>$client->ancienindex,
                'tarif_id'=>$setTarifs[$client->typeclient]->id,
                'prixunitaire'=>$setTarifs[$client->typeclient]->montant,
                'redevance'=>$setTarifs[$client->typeclient]->redevance,
                'etat'=> 'NONPAYE'
            ]));
        }
        return Facture::where('periode', '=', $request['periode']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function show(Facture $facture)
    {
        return $facture;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Facture  $scolarite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Facture $facture)
    {
        $facture->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Facture $facture)
    {
        $facture->delete();
    }
    
    public function cancelle(Request $request)
    {
        $facture = Facture::find($request->id);
        return $facture->update(["cancelled_at"=>now(),"motif"=>$request->motif]);
    }

    public function restore(Request $request)
    {
        $facture = Facture::find($request->id);
        return $facture->update(["cancelled_at"=>null,"motif"=>null]);
    }
    
}
