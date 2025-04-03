export class DesignationDepense {
    id?:number; 
   categorie_id:number; 
   libelle:string; 
   updated_by: string;
   created_by: string;
   updated_at: Date;
   created_at: Date;  
    constructor(designationDepense) {
        this.id = designationDepense.id; 
        this.libelle = designationDepense.libelle; 
        this.categorie_id = designationDepense.categorie_id; 
        this.updated_by = designationDepense.updated_by;
        this.created_by = designationDepense.created_by;
        this.updated_at = designationDepense.updated_at;
        this.created_at = designationDepense.created_at;
    }
    
}
