//@Author DAO Hamadou

export class Matiere {
        id:number;
        annee_id:number;
        categorie_id:number;
        categorie:any;
        libelle:string;
        code:string;
        ordre:number;
        updated_by:any;
        created_by:any;
        updated_at:any;
        created_at:any;
        coefficient?

    constructor(matiere){
        this.id=matiere.id;
        this.annee_id=matiere.annee_id;
        this.categorie_id=matiere.categorie_id;
        this.categorie=matiere.categorie;
        this.libelle=matiere.libelle;
        this.code=matiere.code;
        this.updated_by=matiere.updated_by;
        this.created_by=matiere.created_by;
        this.updated_at=matiere.updated_at;
        this.created_at=matiere.created_at;
        this.coefficient = matiere.coefficient;
        this.ordre = matiere.ordre;
    }
}
