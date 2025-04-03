export class DasQuittance {
    id?:number;
    traitements_dts_salaries_id:number;
    mois:number;
    societe_id:number;
    annee:number;
    montant:number;
    n_quittance:string;
    nature:string;
    date_quittance:string;
    constructor(dasquittances) {
        this.id = dasquittances.id;
        this.mois = dasquittances.mois;
        this.montant = dasquittances.montant;
        this.n_quittance = dasquittances.n_quittance;
        this.nature = dasquittances.nature;
        this.date_quittance = dasquittances.date_quittance;
        this.annee = dasquittances.annee;
        this.societe_id = dasquittances.societe_id;
    }
    
    copy?(dasquittances) {
        this.mois = dasquittances.mois;
        this.montant = dasquittances.montant;
        this.n_quittance = dasquittances.n_quittance;
        this.nature = dasquittances.nature;
        this.date_quittance = dasquittances.date_quittance;
        this.annee = dasquittances.annee;
        this.societe_id = dasquittances.societe_id;
    }
}
