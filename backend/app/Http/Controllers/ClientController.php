<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use App\Models\PersonnelAll;
use Illuminate\Http\Request;

class PersonnelController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Personnel::orderBy('nom','ASC')->orderBy('prenom','ASC')->get();
    }
 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Personnel::create(MyFunction::audit($request->all()));
        return response()->json([
            'message' => 'Un nouveau personnel a été ajoutée',
            'status' => 200
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function show(PersonnelAll $personnel)
    {
        return $personnel;
    } 


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Personnel $personnel)
    {
        $personnel->update(MyFunction::audit($request->all()));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Personnel $personnel)
    {
        $personnel->delete();
    }

    
    public function uploadAvatar(Request $request){
        $personnel = Personnel::find($request->personnel_id);
        $request->validate([
            'uploadFile' => 'required|mimes:jpeg,jpg,png,xls,pdf|max:10048'
            ]);
            if($request->file()) {
                $fileName = time().'.'.$request->uploadFile->extension();
                $filePath = $request->file('uploadFile')->storeAs('uploads/PERSONNEL', $fileName, 'public');
                $personnel->file_name = $fileName;
                $this->removeAvatar($request->personnel_id);
                $personnel->update();
            }
        
        return $personnel;
    }

    public function getAvatar($personnel_id){
        $personnel = Personnel::find($personnel_id);
        return response()->file('..\storage\app\public\uploads\\PERSONNEL\\'.$personnel->file_name);
    }
    public function removeAvatar($personnel_id){
        $personnel = Personnel::find($personnel_id);

        if($personnel->file_name!=null&&file_exists(storage_path('..\storage\app\public\uploads\\PERSONNEL\\'.$personnel->file_name)))
        unlink(storage_path('..\storage\app\public\uploads\\PERSONNEL\\'.$personnel->file_name));
        $personnel->file_name = null;
        $personnel->update();
        return $personnel;
    }
    
}