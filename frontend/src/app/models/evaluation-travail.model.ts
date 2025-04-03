export class EvaluationTravail {
    id:number
    annee_id
    annee_scolaire
    trimestre
    salle_classe_id
    salle_classe
    effectif_classe_fille
    effectif_classe_garcon
    effectif_ayant_moyenne_fille
    effectif_ayant_moyenne_garcon
    moyenne_classe
    observation
    forte_moyenne
    forte_moyenne_detenue
    faible_moyenne
    faible_moyenne_detenue
    blame
    avertis
    tableau_honneur
    tableau_honneur_encouragement
    tableau_honneur_felicitation
    decision_conseil
    professeur_principal_id
    professeur_principal

    constructor(evaluationTravail){
    this.id = evaluationTravail.id
    this.annee_id = evaluationTravail.annee_id
    this.annee_scolaire = evaluationTravail.annee_scolaire
    this.trimestre = evaluationTravail.trimestre
    this.salle_classe_id = evaluationTravail.salle_classe_id
    this.salle_classe = evaluationTravail.salle_classe
    this.effectif_classe_fille = evaluationTravail.effectif_classe_fille
    this.effectif_classe_garcon = evaluationTravail.effectif_classe_garcon
    this.effectif_ayant_moyenne_fille = evaluationTravail.effectif_ayant_moyenne_fille
    this.effectif_ayant_moyenne_garcon = evaluationTravail.effectif_ayant_moyenne_garcon
    this.moyenne_classe = evaluationTravail.moyenne_classe
    this.observation = evaluationTravail.observation
    this.forte_moyenne = evaluationTravail.forte_moyenne
    this.forte_moyenne_detenue = evaluationTravail.forte_moyenne_detenue
    this.faible_moyenne = evaluationTravail.faible_moyenne
    this.faible_moyenne_detenue = evaluationTravail.faible_moyenne_detenue
    this.blame = evaluationTravail.blame
    this.avertis = evaluationTravail.avertis
    this.tableau_honneur = evaluationTravail.tableau_honneur
    this.tableau_honneur_encouragement = evaluationTravail.tableau_honneur_encouragement
    this.tableau_honneur_felicitation = evaluationTravail.tableau_honneur_felicitation
    this.decision_conseil = evaluationTravail.decision_conseil
    this.professeur_principal_id = evaluationTravail.professeur_principal_id
    this.professeur_principal = evaluationTravail.professeur_principal
    }
}
