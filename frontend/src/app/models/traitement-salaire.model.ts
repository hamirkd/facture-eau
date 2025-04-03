export class TraitementSalaire {
    id:number
    
    'annee_id'
    'mois'
    'mois_label'
    'personnel_id'
    'nom_prenom_personnel':string;
    'type_contrat'
    'volume_horaire'
    'taux_horaire'
    'revenue_mensuel'
    'verou'
    montant_brut
    montant_net
    taux_iuts
    iuts
    updated_by:any;
    created_by:any;
    updated_at:any;
    created_at:any;

    constructor(personnel){
        this.id = personnel.id
        this.annee_id = personnel.annee_id
        this.mois = personnel.mois
        this.mois_label = personnel.mois_label
        this.personnel_id = personnel.personnel_id
        this.nom_prenom_personnel = personnel.nom_prenom_personnel
        this.type_contrat = personnel.type_contrat;
        this.volume_horaire = personnel.volume_horaire;
        this.taux_horaire = personnel.taux_horaire;
        this.montant_brut = personnel.montant_brut;
        this.montant_net = personnel.montant_net;
        this.taux_iuts = personnel.taux_iuts;
        this.iuts = personnel.iuts;
        this.type_contrat = personnel.type_contrat;
        this.verou = personnel.verou;
        this.updated_by = personnel.updated_by;
        this.created_by = personnel.created_by;
        this.updated_at = personnel.updated_at;
        this.created_at = personnel.created_at;
    }
}
