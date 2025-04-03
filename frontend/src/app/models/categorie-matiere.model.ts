//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO


export class CategorieMatiere {
        id:number
        code:number
        libelle:string

    constructor(categorieMatiere){
        this.id = categorieMatiere.id
        this.code = categorieMatiere.code
        this.libelle = categorieMatiere.libelle
    }
}
