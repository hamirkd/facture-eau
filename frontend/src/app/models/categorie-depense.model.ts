export class CategorieDepense {
    id?:number; 
   libelle:string; 
   updated_by: string;
   created_by: string;
   updated_at: Date;
   created_at: Date;  
    constructor(categorieDepense) {
        this.id = categorieDepense.id; 
        this.libelle = categorieDepense.libelle; 
        this.updated_by = categorieDepense.updated_by;
        this.created_by = categorieDepense.created_by;
        this.updated_at = categorieDepense.updated_at;
        this.created_at = categorieDepense.created_at;
    }
    
}
