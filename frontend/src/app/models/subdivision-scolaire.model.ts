export class SubdivisionScolaire {
    id:number;
    code:string;
    libelle:string; 
    annee_id:number; 
    lecture:boolean; 
    ecriture:boolean; 
    updated_by;
    created_by;
    updated_at;
    created_at;

    constructor(subdivisionScolaire){
        this.id = subdivisionScolaire.id
        this.code = subdivisionScolaire.code
        this.libelle = subdivisionScolaire.libelle
        this.lecture = subdivisionScolaire.lecture
        this.annee_id = subdivisionScolaire.annee_id
        this.ecriture = subdivisionScolaire.ecriture
        this.updated_by = subdivisionScolaire.updated_by;
        this.created_by = subdivisionScolaire.created_by;
    }
}
