export class TraitementDas{

     id?:number;
     annee:number;
     societe_id:number;
     brut_presence:number;
     av_eau_elec:number;
     av_nourriture:number;
     brut_conge:number;
     prime_impo:number;
     prime_non_impo:number;
     irpp:number;
     tcs:number;
     fnh:number;

    constructor(decl:any){
        this.id=decl.id;
        this.annee=decl.annee;
        this.societe_id=decl.societe_id;
        this.brut_presence=decl.brut_presence;
        this.brut_conge=decl.brut_conge;
        this.av_eau_elec=decl.av_eau_elec;
        this.av_nourriture=decl.av_nourriture;
        this.prime_impo=decl.prime_impo;
        this.prime_non_impo=decl.prime_non_impo;
        this.irpp=decl.irpp;
        this.tcs=decl.tcs;
        this.fnh=decl.fnh;
    }

    copy?(decl:any){
        this.annee=decl.annee;
        this.societe_id=decl.societe_id;
        this.brut_presence=decl.brut_presence;
        this.av_eau_elec=decl.av_eau_elec;
        this.av_nourriture=decl.av_nourriture;
        this.prime_impo=decl.prime_impo;
        this.prime_non_impo=decl.prime_non_impo;
        this.brut_conge=decl.brut_conge;
        this.irpp=decl.irpp;
        this.tcs=decl.tcs;
        this.fnh=decl.fnh;
    }

 }
            