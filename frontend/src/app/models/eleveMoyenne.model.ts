//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO


export class EleveMoyenne {
    id:number
    prenom:string
    nom:string
    matricule:number
    cf:number
    og:number
    oe:number
    ph:number
    an:number
    lv2:number
    hg:number
    ma:number
    sp:number
    svt:number
    eps:number
    mus:number
    ap:number
    edhc:number
    cond:number
    bonus:number
    trim1:number
    trim2:number
    trim3:number
    am:number
    classe:number

    constructor(eleve){
        this.id = eleve.id
        this.prenom = eleve.prenom
        this.nom = eleve.nom
        this.matricule = eleve.matricule
        this.cf = eleve.cf
        this.og = eleve.og
        this.oe = eleve.oe
        this.ph = eleve.ph
        this.an = eleve.an
        this.lv2 = eleve.lv2
        this.hg = eleve.hg
        this.ma = eleve.ma
        this.sp = eleve.sp
        this.svt = eleve.svt
        this.eps = eleve.eps
        this.mus = eleve.mus
        this.ap = eleve.ap
        this.edhc = eleve.edhc
        this.cond = eleve.cond
        this.bonus = eleve.bonus
        this.trim1 = eleve.trim1
        this.trim2 = eleve.trim2
        this.trim3 = eleve.trim3
        this.am = eleve.am
        this.classe = eleve.classe
    }
}
