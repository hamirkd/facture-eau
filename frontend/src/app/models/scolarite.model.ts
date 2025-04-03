//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO


export class Scolarite {

    id:number
    annee_id:string
    classe_id:number
    frais_inscription:number
    frais_scolarite:number
    frais_scolarite_affecte:number
    autres_frais:number
    serie:string

    constructor(scolarite){
        this.id = scolarite.id
        this.annee_id = scolarite.annee_id
        this.frais_inscription = scolarite.frais_inscription
        this.classe_id = scolarite.classe_id
        this.frais_scolarite = scolarite.frais_scolarite
        this.frais_scolarite_affecte = scolarite.frais_scolarite_affecte
        this.autres_frais = scolarite.autres_frais
        this.serie = scolarite.serie
    }
}
