//Matricule	NIF	Nom	Prénom	Emploi	Niveau	Nationalité	Age	Sexe	Enfants	Téléphone	Code postal	Ville	Emploi occupé	Situation familiale	DEB10	DEB11	FIN12	FIN13DAS
//BRUT	AVLOG	AV NOUR	PRIM IMPO	BRUT CONGE	TOTAL 20 à 24	TCS	IRPP	FNH	CFP	TOTAL26 à 29	IND NON IMPO


export class Personnel {
    id:number
    nom:string
    prenom:string
    genre:'HOMME'|'FEMME';
    telephone:string ;
    file_name:string;
    email:string;
    datenais:any;
    observation:any;
    typepersonnel:'FONCTIONNAIRE_ISSP'|'FONCTIONNAIRE_UJKZ'|'FONCTIONNAIRE'|'FONCTIONNAIRE_ENSEIGNANT_CHERCHEUR'|'CONTRACTUELS_ISSP'|'CONTRACTUELS_UJKZ'|'ASSISTANTS_RECHERCHE';
    niveauetude:string;
    lieunais:string;
    matrimoniale:string;
    nationnalite:string;
    matricule:string;
    salaire_brute:number;
    date_premiere_prise_service:any;
    poste_id:number;
    specialite:string;
    domaine_discipline:string;
    position:string;
    updated_by:any;
    created_by:any;
    updated_at:any;
    created_at:any;
    userUpdate:any;
    userCreate:any;

    constructor(personnel){
        this.id = personnel.id
        this.nom = personnel.nom
        this.prenom = personnel.prenom
        this.genre = personnel.genre
        this.telephone = personnel.telephone
        this.email = personnel.email
        this.datenais = personnel.datenais;
        this.observation = personnel.observation;
        this.niveauetude = personnel.niveauetude;
        this.lieunais = personnel.lieunais;
        this.matrimoniale = personnel.matrimoniale;
        this.nationnalite = personnel.nationnalite;
        this.typepersonnel = personnel.typepersonnel;
        this.matricule = personnel.matricule;
        this.file_name = personnel.file_name;
        this.updated_by = personnel.updated_by;
        this.created_by = personnel.created_by;
        this.updated_at = personnel.updated_at;
        this.created_at = personnel.created_at;
        this.userUpdate = personnel.userUpdate;
        this.userCreate = personnel.userCreate;
    }
}
