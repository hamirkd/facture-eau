//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

import { Societe } from './societe.model';

export class Salarie {
    id?:number;
    societe?: Societe;
    societe_id?:number;
    matricule: string;
    nif: string;
    nom: string;
    prenom: string;
    emploi?: string;
    niveau: string;
    nationalite: string;
    age: string;
    sexe: string;
    enfants: string;
    telephone: string;
    code_postal: string;
    ville: string;
    emploi_occupe: string;
    situation_familiale: string;
    deb10: string;
    deb11: string;
    fin12: string;
    fin13das: string;

    constructor(salarie: any) {
        this.id = salarie.id;
        this.societe = salarie.societe;
        this.societe_id = salarie.societe_id;
        this.matricule = salarie.matricule;
        this.nif = salarie.nif;
        this.nom = salarie.nom;
        this.prenom = salarie.prenom;
        this.emploi = salarie.emploi;
        this.niveau = salarie.niveau;
        this.nationalite = salarie.nationalite;
        this.age = salarie.age;
        this.sexe = salarie.sexe;
        this.enfants = salarie.enfants;
        this.telephone = salarie.telephone;
        this.code_postal = salarie.code_postal;
        this.ville = salarie.ville;
        this.emploi_occupe = salarie.emploi_occupe;
        this.situation_familiale = salarie.situation_familiale;
        this.deb10 = salarie.deb10;
        this.deb11 = salarie.deb11;
        this.fin12 = salarie.fin12;
        this.fin13das = salarie.fin13das;
    }
    copy?(salarie: any) {
        this.societe = salarie.societe;
        this.societe_id = salarie.societe_id;
        this.matricule = salarie.matricule;
        this.nif = salarie.nif;
        this.nom = salarie.nom;
        this.prenom = salarie.prenom;
        this.emploi = salarie.emploi;
        this.niveau = salarie.niveau;
        this.nationalite = salarie.nationalite;
        this.age = salarie.age;
        this.sexe = salarie.sexe;
        this.enfants = salarie.enfants;
        this.telephone = salarie.telephone;
        this.code_postal = salarie.code_postal;
        this.ville = salarie.ville;
        this.emploi_occupe = salarie.emploi_occupe;
        this.situation_familiale = salarie.situation_familiale;
        this.deb10 = salarie.deb10;
        this.deb11 = salarie.deb11;
        this.fin12 = salarie.fin12;
        this.fin13das = salarie.fin13das;
    }
}
