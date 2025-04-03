//@Author DAO Hamadou

export class ServiceAffectation {
        id:number;
        libelle:string;
        updated_by:any;
        created_by:any;
        updated_at:any;
        created_at:any;

    constructor(serviceAffectation){
        this.id=serviceAffectation.id;
        this.libelle=serviceAffectation.libelle;
        this.updated_by=serviceAffectation.updated_by;
        this.created_by=serviceAffectation.created_by;
        this.updated_at=serviceAffectation.updated_at;
        this.created_at=serviceAffectation.created_at;
    }
}
