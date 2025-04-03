export class Inscription {

    id:number
    scolarite_id
    annee_id:string
    eleve_id:string
    classe_id:number
    salle_classe_id:number
    etat_scolarite:'SOLDE'|'ENCOURS'
    redoublant:'OUI'|'NON'
    src_photo:string;
    serie?:string;
    salle_classe?

    constructor(inscription){
        this.id = inscription.id
        this.scolarite_id = inscription.scolarite_id
        this.annee_id = inscription.annee_id
        this.eleve_id = inscription.eleve_id
        this.classe_id = inscription.classe_id
        this.salle_classe_id = inscription.salle_classe_id
        this.redoublant = inscription.redoublant
        this.src_photo = inscription.src_photo
        this.salle_classe = inscription.salle_classe
    }
}
