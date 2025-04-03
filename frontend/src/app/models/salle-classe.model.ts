//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO


export class SalleClasse {
    id:number
    classe_id:number
    annee_id:number
    serie:string
    code:string
    libelle:string 

    constructor(salleClasse){
        this.id = salleClasse.id
        this.classe_id = salleClasse.classe_id
        this.annee_id = salleClasse.annee_id
        this.serie = salleClasse.serie
        this.code = salleClasse.code
        this.libelle = salleClasse.libelle
    }
}
