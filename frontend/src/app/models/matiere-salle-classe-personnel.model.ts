//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

import { Personnel } from "./personnel.model"


export class MatiereSalleClassePersonnel {
    id:number
    salle_classe_id:number
    salle_classe:any
    annee_id:number
    matiere_id:number
    matiere:any
    personnel_id:number
    personnel:Personnel
    coefficient:number 
    updated_by:any;
    created_by:any;
    updated_at:any;
    created_at:any;

    constructor(matiereSalleClassePersonnel){
        this.id = matiereSalleClassePersonnel.id
        this.salle_classe_id = matiereSalleClassePersonnel.salle_classe_id
        this.salle_classe = matiereSalleClassePersonnel.salle_classe
        this.annee_id = matiereSalleClassePersonnel.annee_id
        this.matiere_id = matiereSalleClassePersonnel.matiere_id
        this.matiere = matiereSalleClassePersonnel.matiere
        this.personnel_id = matiereSalleClassePersonnel.personnel_id
        this.personnel = matiereSalleClassePersonnel.personnel
        this.coefficient = matiereSalleClassePersonnel.coefficient
        this.updated_by = matiereSalleClassePersonnel.updated_by;
        this.created_by = matiereSalleClassePersonnel.created_by;
        this.updated_at = matiereSalleClassePersonnel.updated_at;
        this.created_at = matiereSalleClassePersonnel.created_at;
    }
}
