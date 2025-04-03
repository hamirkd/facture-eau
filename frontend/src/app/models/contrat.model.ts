//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

import { Personnel } from "./personnel.model"
import { Poste } from "./poste.model";
import { ServiceAffectation } from "./service-affectation.model";


export class Contrat {
    id:number
    personnel_id:number
    personnel?:Personnel;
    numerocontrat:string
    objetcontrat:string
    datesignature:string
    datedebut:string
    datefin:string
    cnss:string;
    salaire:string;
    duree:string;
    niveaurecrutement:string;
    projet:string;
    poste_id:number;
    poste?:Poste;
    serviceaffection_id:number;
    serviceAffectation?:ServiceAffectation;
    typecontrat:string;
    nomprenompersonneaprevenir:string;
    updated_by:any;
    created_by:any;
    updated_at:any;
    created_at:any;
    userUpdate:any;
    userCreate:any;
    droitcontractuel: string;
    avisdirection: string;
    datedemanderupture: string;
    daterupture: string;
    motifrupture: string;
    delaispreavis: string;

    constructor(contrat){
        this.id = contrat.id
        this.personnel_id = contrat.personnel_id
        this.numerocontrat = contrat.numerocontrat
        this.objetcontrat = contrat.objetcontrat
        this.datesignature = contrat.datesignature
        this.datedebut = contrat.datedebut
        this.datefin = contrat.datefin
        this.cnss = contrat.cnss;
        this.salaire = contrat.salaire;
        this.duree = contrat.duree;
        this.niveaurecrutement = contrat.niveaurecrutement;
        this.projet = contrat.projet;
        this.poste_id = contrat.poste_id;
        this.poste = contrat.poste;
        this.serviceaffection_id = contrat.serviceaffection_id;
        this.serviceAffectation = contrat.serviceAffectation;
        this.typecontrat = contrat.typecontrat;
        this.nomprenompersonneaprevenir = contrat.nomprenompersonneaprevenir;
        this.personnel = contrat.personnel;
        this.userUpdate = contrat.userUpdate;
        this.userCreate = contrat.userCreate;
        this.updated_by = contrat.updated_by;
        this.created_by = contrat.created_by;
        this.updated_at = contrat.updated_at;
        this.created_at = contrat.created_at;
        this.droitcontractuel = contrat.droitcontractuel;
        this.avisdirection = contrat.avisdirection;
        this.datedemanderupture = contrat.datedemanderupture;
        this.daterupture = contrat.daterupture;
        this.motifrupture = contrat.motifrupture;
        this.delaispreavis = contrat.delaispreavis;
    }
}
