
export class Bulletin {
    id
    annee_id
    annee_scolaire
    trimestre
    salle_classe_id
    salle_classe
    eleve_id
    matricule
    nom_prenom
    totaux
    conduite
    sanction
    plus_fort_moyenne
    plus_faible_moyenne
    moyenne_classe
    effectif
    rang
    moyenne
    moyenne_t1
    moyenne_t2
    decision_conseil

    constructor(bulletin){
    this.id = bulletin.id
    this.annee_id = bulletin.annee_id
    this.annee_scolaire = bulletin.annee_scolaire
    this.trimestre = bulletin.trimestre
    this.salle_classe_id = bulletin.salle_classe_id
    this.salle_classe = bulletin.salle_classe
    this.eleve_id = bulletin.eleve_id
    this.matricule = bulletin.matricule
    this.nom_prenom = bulletin.nom_prenom
    this.totaux = bulletin.totaux
    this.conduite = bulletin.conduite
    this.sanction = bulletin.sanction
    this.plus_fort_moyenne = bulletin.plus_fort_moyenne
    this.plus_faible_moyenne = bulletin.plus_faible_moyenne
    this.moyenne_classe = bulletin.moyenne_classe
    this.effectif = bulletin.effectif
    this.rang = bulletin.rang
    this.moyenne = bulletin.moyenne
    this.moyenne_t1 = bulletin.moyenne_t1
    this.moyenne_t2 = bulletin.moyenne_t2
    this.decision_conseil = bulletin.decision_conseil
    
    }
}
