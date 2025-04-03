//@Author DAO Hamadou

export class Poste {
        id:number;
        libelle:string;
        updated_by:any;
        created_by:any;
        updated_at:any;
        created_at:any;

    constructor(poste){
        this.id=poste.id;
        this.libelle=poste.libelle;
        this.updated_by=poste.updated_by;
        this.created_by=poste.created_by;
        this.updated_at=poste.updated_at;
        this.created_at=poste.created_at;
    }
}
