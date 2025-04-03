import moment from "moment";

  // code;regime;raison_sociale;sigle;rccm;cnss;contribuable;statistique;activite;date_creation;date_mise_service;date_effet;date_immatriculation;adresse;code_postal;ville;telephone;fax;email;nif;  constructor(public modal: NgbActiveModal,public toastr: ToastrManager) { 
export class Societe{
      id?:number;
      code:string;
      regime:string;
      raison_sociale:string;
      sigle:string;
      rccm:string;
      cnss:string;
      contribuable:string;
      statistique:string;
      activite:string;
      date_creation:string;
      date_mise_service:string;
      date_effet:string;
      date_immatriculation:string;
      adresse:string;
      code_postal:string;
      ville:string;
      bp:string;
      telephone:string;
      fax:string;
      email:string;
      nif:string;
      source_donnees:string;
      code_residence:string;
      adressen:string;
      rue:string;
      lieu_dit:string;
      quartier:string;
      arrondissement:string;
      departement:string;
      province:string; 
      signataire?:string;
      copy?(societe) { 
          this.code=societe.code;
          this.regime=societe.regime;
          this.raison_sociale=societe.raison_sociale;
          this.sigle=societe.sigle;
          this.rccm=societe.rccm;
          this.cnss=societe.cnss;
          this.contribuable=societe.contribuable;
          this.statistique=societe.statistique;
          this.activite=societe.activite;
          this.date_creation=societe.date_creation;
          this.date_mise_service=societe.date_mise_service;
          this.date_effet=societe.date_effet;
          this.date_immatriculation=societe.date_immatriculation;
          this.adresse=societe.adresse;
          this.code_postal=societe.code_postal;
          this.ville=societe.ville;
          this.telephone=societe.telephone;
          this.fax=societe.fax;
          this.email=societe.email;
          this.nif=societe.nif;
          this.source_donnees=societe.source_donnees;
          this.code_residence=societe.code_residence;
          this.adressen=societe.adressen;
          this.rue=societe.rue;
          this.lieu_dit=societe.lieu_dit;
          this.quartier=societe.quartier;
          this.arrondissement=societe.arrondissement;
          this.departement=societe.departement;
          this.province=societe.province; 
          this.signataire=societe.signataire; 
          }
          constructor(societe) { 
            this.id= societe.id;
              this.code=societe.code;
              this.regime=societe.regime;
              this.raison_sociale=societe.raison_sociale;
              this.sigle=societe.sigle;
              this.rccm=societe.rccm;
              this.cnss=societe.cnss;
              this.contribuable=societe.contribuable;
              this.statistique=societe.statistique;
              this.activite=societe.activite;
              this.date_creation=societe.date_creation;
              this.date_mise_service=societe.date_mise_service;
              this.date_effet=societe.date_effet;
              this.date_immatriculation=societe.date_immatriculation;
              this.adresse=societe.adresse;
              this.code_postal=societe.code_postal;
              this.ville=societe.ville;
              this.telephone=societe.telephone;
              this.fax=societe.fax;
              this.email=societe.email;
              this.nif=societe.nif;
              this.source_donnees=societe.source_donnees;
              this.code_residence=societe.code_residence;
              this.adressen=societe.adressen;
              this.rue=societe.rue;
              this.lieu_dit=societe.lieu_dit;
              this.quartier=societe.quartier;
              this.arrondissement=societe.arrondissement;
              this.departement=societe.departement;
              this.province=societe.province; 
              this.signataire=societe.signataire; 

              this.date_creation = this.date_creation?moment(this.date_creation).format("YYYY/M/D"):this.date_creation;
              this.date_effet = this.date_effet?moment(this.date_effet).format("YYYY/M/D"):this.date_effet;
              this.date_mise_service = this.date_mise_service?moment(this.date_mise_service).format("YYYY/M/D"):this.date_mise_service;
              this.date_immatriculation = this.date_immatriculation?moment(this.date_immatriculation).format("YYYY/M/D"):this.date_immatriculation;
              }

}