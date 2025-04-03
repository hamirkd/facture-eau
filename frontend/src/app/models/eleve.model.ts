export class Eleve {
    id: number;
    file_name?:string;
    matricule: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    lieu_naissance: string;
    n_extrait: string;
    genre: 'M' | 'F';
    telephone: string;
    nom_prenom_pere: string;
    profession_pere: string;
    nom_prenom_mere: string;
    profession_mere: string;
    nom_prenom_tel_pers_pre_besoin: string;
    updated_by: string;
    created_by: string;
    constructor(eleve) {
        this.id = eleve.id;
        this.file_name = eleve.file_name;
        this.matricule = eleve.matricule;
        this.nom = eleve.nom;
        this.prenom = eleve.prenom;
        this.date_naissance = eleve.date_naissance;
        this.lieu_naissance = eleve.lieu_naissance;
        this.n_extrait = eleve.n_extrait;
        this.genre = eleve.genre;
        this.telephone = eleve.telephone;
        this.nom_prenom_pere = eleve.nom_prenom_pere;
        this.profession_pere = eleve.profession_pere;
        this.nom_prenom_mere = eleve.nom_prenom_mere;
        this.profession_mere = eleve.profession_mere;
        this.nom_prenom_tel_pers_pre_besoin = eleve.nom_prenom_tel_pers_pre_besoin;
        this.updated_by = eleve.updated_by;
        this.created_by = eleve.created_by;
    }
}
