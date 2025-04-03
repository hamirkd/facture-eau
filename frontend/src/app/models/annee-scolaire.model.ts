//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO

export class AnneeScolaire {
    id: number;
    libelle: string;
    annee: number;
    updated_by: string;
    created_by: string;
    constructor(eleve) {
        this.id = eleve.id;
        this.libelle = eleve.libelle;
        this.annee = eleve.annee;
        this.updated_by = eleve.updated_by;
        this.created_by = eleve.created_by;
    }
}
