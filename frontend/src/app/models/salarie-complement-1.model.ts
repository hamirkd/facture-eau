//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

import { Salarie } from './salarie.model';

export class SalarieComplement extends Salarie {
    id?: number;
    brute:number;
    avlog:number;
    av_nour:number;
    prim_impo:number;
    brut_conge: number;
    total_brut:number;
    salaire_brut:number;
    total:number;
    total_20_a_24:number;
    tcs:number;
    irpp:number;
    fnh:number;
    cfp:number;
    total_26_a_29:number;
    primes_non_impo:number;
    n_statistique:string;

    brut_presence: number;
    av_eau_elec: number;
    av_nourriture: number;
    ind_impo: number;
    ind_nonimpo: number;

    alloc_familiale: number;
    autre_deduc: number;
    avance: number;
    numero_dts: number;
    reste: number;
    detail_situ_fam : string;

    n_cnss: string;
    n_cnamgs: string;
    date_embauche: string;
    date_depart: string;
    tx_cnamgs: number;
    tx_cnss: number;

    bpcnss1:number;
    bpcnam1:number;
    bdplaf1:number;
    njrcnss1:number;
    njrcnam1:number;

    bpcnss2:number;
    bpcnam2:number;
    bdplaf2:number;
    njrcnss2:number;
    njrcnam2:number;
    
    bpcnss3:number;
    bpcnam3:number;
    bdplaf3:number;
    njrcnss3:number;
    njrcnam3:number;
    code_etablissement:string;


    
    nif_conjoint:string;
    nom_conjoint:string;
    prenom_conjoint:string;
    nom_jeune_fille_conjoint:string;
    profession_conjoint:string;
    employeur_conjoint:string;
    telephone_conjoint:string;
    code_postal_conjoint:string;
    ville_conjoint:string;

    constructor(salarie: any) {
        super(salarie);
        this.brute = salarie.brute;
        this.avlog = salarie.avlog;
        this.av_nour = salarie.av_nour;
        this.prim_impo = salarie.prim_impo;
        this.brut_conge = salarie.brut_conge;
        this.total_20_a_24 = salarie.total_20_a_24;
        this.salaire_brut = salarie.salaire_brut;
        this.total_brut = salarie.total_brut;
        this.tcs = salarie.tcs;
        this.irpp = salarie.irpp;
        this.fnh = salarie.fnh;
        this.cfp = salarie.cfp;
        this.detail_situ_fam = salarie.detail_situ_fam;
        this.total_26_a_29 = salarie.total_26_a_29;
        this.primes_non_impo = salarie.primes_non_impo;
        this.n_cnss = salarie.n_cnss;
        this.n_cnamgs = salarie.n_cnamgs;
        this.date_embauche = salarie.date_embauche;
        this.date_depart = salarie.date_depart;
        this.n_statistique = salarie.n_statistique;
        this.tx_cnamgs = salarie.tx_cnamgs;
        this.tx_cnss = salarie.tx_cnss;


        this.bpcnss1 = salarie.bdplaf1;
        this.bpcnam1 = salarie.bpcnam1;
        this.bdplaf1 = salarie.bdplaf1;
        this.njrcnss1 = salarie.njrcnss1;
        this.njrcnam1 = salarie.njrcnam1;
        
        this.bpcnss2 = salarie.bdplaf2;
        this.bpcnam2 = salarie.bpcnam2;
        this.bdplaf2 = salarie.bdplaf2;
        this.njrcnss2 = salarie.njrcnss2;
        this.njrcnam2 = salarie.njrcnam2;
        
        this.bpcnss3 = salarie.bdplaf3;
        this.bpcnam3 = salarie.bpcnam3;
        this.bdplaf3 = salarie.bdplaf3;
        this.njrcnss3 = salarie.njrcnss3;
        this.njrcnam3 = salarie.njrcnam3;

        this.code_etablissement = salarie.code_etablissement;


        
        this.nif_conjoint = salarie.nif_conjoint;
        this.nom_conjoint = salarie.nom_conjoint;
        this.prenom_conjoint = salarie.prenom_conjoint;
        this.nom_jeune_fille_conjoint = salarie.nom_jeune_fille_conjoint;
        this.profession_conjoint = salarie.profession_conjoint;
        this.employeur_conjoint = salarie.employeur_conjoint;
        this.telephone_conjoint = salarie.telephone_conjoint;
        this.code_postal_conjoint = salarie.code_postal_conjoint;
        this.ville_conjoint = salarie.ville_conjoint;
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
        this.detail_situ_fam = salarie.detail_situ_fam;
        this.nationalite = salarie.nationalite;
        this.salaire_brut = salarie.salaire_brut;
        this.total_brut = salarie.total_brut;

        this.n_statistique = salarie.n_statistique;
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
        this.brute = salarie.brute;
        this.avlog = salarie.avlog;
        this.av_nour = salarie.av_nour;
        this.prim_impo = salarie.prim_impo;
        this.brut_conge = salarie.brut_conge;
        this.total_20_a_24 = salarie.total_20_a_24;
        this.tcs = salarie.tcs;
        this.irpp = salarie.irpp;
        this.fnh = salarie.fnh;
        this.cfp = salarie.cfp;
        this.total_26_a_29 = salarie.total_26_a_29;
        this.primes_non_impo = salarie.primes_non_impo;
        this.n_cnss = salarie.n_cnss;
        this.n_cnamgs = salarie.n_cnamgs;
        this.date_embauche = salarie.date_embauche;
        this.date_depart = salarie.date_depart;
        this.tx_cnamgs = salarie.tx_cnamgs;
        this.tx_cnss = salarie.tx_cnss;

        this.bpcnss1 = salarie.bdplaf1;
        this.bpcnam1 = salarie.bpcnam1;
        this.bdplaf1 = salarie.bdplaf1;
        this.njrcnss1 = salarie.njrcnss1;
        this.njrcnam1 = salarie.njrcnam1;
        
        this.bpcnss2 = salarie.bdplaf2;
        this.bpcnam2 = salarie.bpcnam2;
        this.bdplaf2 = salarie.bdplaf2;
        this.njrcnss2 = salarie.njrcnss2;
        this.njrcnam2 = salarie.njrcnam2;
        
        this.bpcnss3 = salarie.bdplaf3;
        this.bpcnam3 = salarie.bpcnam3;
        this.bdplaf3 = salarie.bdplaf3;
        this.njrcnss3 = salarie.njrcnss3;
        this.njrcnam3 = salarie.njrcnam3;

        this.code_etablissement = salarie.code_etablissement;

        
        this.nif_conjoint = salarie.nif_conjoint;
        this.nom_conjoint = salarie.nom_conjoint;
        this.prenom_conjoint = salarie.prenom_conjoint;
        this.nom_jeune_fille_conjoint = salarie.nom_jeune_fille_conjoint;
        this.profession_conjoint = salarie.profession_conjoint;
        this.employeur_conjoint = salarie.employeur_conjoint;
        this.telephone_conjoint = salarie.telephone_conjoint;
        this.code_postal_conjoint = salarie.code_postal_conjoint;
        this.ville_conjoint = salarie.ville_conjoint;
    }
    
}
