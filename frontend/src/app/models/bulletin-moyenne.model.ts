

export class BulletinMoyenne {
        id:number
        annee_id:number;
        bulletin_id:number;
        trimestre:'T1'|'T2'|'T3';
        eleve_id:number;
        matiere_id:number;
        moyenne_compo:number;
        moyenne_travail:number;
        coefficient:number;
        moyenne:number;
        total:number;
        appreciation:'FAIBLE'|'INSUFFISANT'|'PASSABLE'|'ASSEZ-BIEN'|'BIEN'|'TRES-BIEN'|'EXCELLENT';
        nom_prof:string;
        libelle_matiere:string;
        eleve:any;
        bulletinMoyenne:any;
        salle_classe_id:any;

        updated_by:any;
        created_by:any;
        updated_at:any;
        created_at:any;

    constructor(bulletinMoyenne){
        this.id = bulletinMoyenne.id; 
        this.annee_id = bulletinMoyenne.annee_id;
        this.bulletin_id = bulletinMoyenne.bulletin_id;
        this.trimestre = bulletinMoyenne.trimestre;
        this.matiere_id = bulletinMoyenne.matiere_id;
        this.moyenne_compo = bulletinMoyenne.moyenne_compo;
        this.moyenne_travail = bulletinMoyenne.moyenne_travail;
        this.coefficient = bulletinMoyenne.coefficient;
        this.moyenne = bulletinMoyenne.moyenne;
        this.total = bulletinMoyenne.total;
        this.appreciation = bulletinMoyenne.appreciation;
        this.nom_prof = bulletinMoyenne.nom_prof;
        this.libelle_matiere = bulletinMoyenne.libelle_matiere;

        
        this.eleve = bulletinMoyenne.eleve;
        this.eleve_id = bulletinMoyenne.eleve_id;
        this.bulletinMoyenne = bulletinMoyenne.bulletinMoyenne;
        this.salle_classe_id = bulletinMoyenne.salle_classe_id;

        this.updated_by = bulletinMoyenne.updated_by;
        this.created_by = bulletinMoyenne.created_by;
        this.updated_at = bulletinMoyenne.updated_at;
        this.created_at = bulletinMoyenne.created_at;
    }
}
