import { Societe } from "./societe.model";

 export class DeclarationRetenue{  
     id?:number;
    annee:string;
    mois:string;
    societe_id?:number;
    societe?:Societe;
    mode_reglement:string;
    numero_cheque:string;
    iban:string; 
    bic:string;
    date_versement:string;
    date_signature:string;
    lieu_signature:string;
    irpp:number;
    tcs:number;
    fnh:number;
    cfp:number;

    constructor(decl:any){
    this.annee=decl.annee;
    this.mois=decl.mois;
    this.societe=decl.societe;
    this.mode_reglement=decl.mode_reglement;
    this.numero_cheque=decl.numero_cheque;
    this.iban=decl.iban; 
    this.bic=decl.bic;
    this.date_versement=decl.date_versement;
    this.date_signature=decl.date_signature;
    this.lieu_signature=decl.lieu_signature;
    this.irpp=decl.irpp;
    this.tcs=decl.tcs;
    this.fnh=decl.fnh;
    this.cfp=decl.cfp;
    }
    copy?(decl:any){

        this.annee=decl.annee;
        this.mois=decl.mois;
        this.societe=decl.societe;
        this.mode_reglement=decl.mode_reglement;
        this.numero_cheque=decl.numero_cheque;
        this.iban=decl.iban; 
        this.bic=decl.bic;
        this.date_versement=decl.date_versement;
        this.date_signature=decl.date_signature;
        this.lieu_signature=decl.lieu_signature;
        this.irpp=decl.irpp;
        this.tcs=decl.tcs;
        this.fnh=decl.fnh;
    }

 }
            