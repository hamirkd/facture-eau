//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

import { Eleve } from "./eleve.model"


export class InscriptionEleve extends Eleve {

    id:number
    annee_id:string
    eleve_id:string
    classe_id:number
    salle_classe_id:number
    etat_scolarite:'SOLDE'|'ENCOURS'
    redoublant:'OUI'|'NON'
    affecte:'OUI'|'NON'
    src_photo:string;
    serie?:string;
    eid:number
    iid:number
    classe?:any;
    salle_classe?:any;
    created_at?:Date;
    eleve?
    inscription_id?

    constructor(inscription){
        super(inscription);
        this.id = inscription.id;
        this.annee_id = inscription.annee_id;
        this.eleve_id = inscription.eleve_id;
        this.classe_id = inscription.classe_id;
        this.salle_classe_id = inscription.salle_classe_id;
        this.redoublant = inscription.redoublant;
        this.affecte = inscription.affecte;
        this.src_photo = inscription.src_photo;
        this.etat_scolarite = inscription.etat_scolarite;
        this.serie = inscription.serie;
        this.iid = inscription.iid;
        this.eid = inscription.eid;
        this.eleve = inscription.eleve;
    }
}
