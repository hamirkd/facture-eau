export class Depense {
    id?:number;
   categorie_id:number;
   designation_id:number;
   description:string;
   montant:number;
   updated_by: string;
   created_by: string;
   updated_at: Date;
   created_at: Date;
   deleted_at: Date;
   datedepense: string;
   motif: string;
   cancelled_at: Date;
   auteur?
    constructor(depense) {
        this.id = depense.id;
        this.categorie_id = depense.categorie_id;
        this.designation_id = depense.designation_id;
        this.description = depense.description; 
        this.montant = depense.montant;
        this.updated_by = depense.updated_by;
        this.created_by = depense.created_by;
        this.updated_at = depense.updated_at;
        this.created_at = depense.created_at;
        this.datedepense = depense.datedepense;
        this.motif = depense.motif;
        this.cancelled_at = depense.cancelled_at;
        this.deleted_at = depense.deleted_at;
        this.auteur = depense.auteur;
    }
    
}
