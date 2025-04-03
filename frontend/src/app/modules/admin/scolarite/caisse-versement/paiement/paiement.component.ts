import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { VersementsService } from 'app/core/services/versements.service';
import { Classe } from 'app/models/classe.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { Versement } from 'app/models/versement.model';
import moment from 'moment';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  
  @Input() name;


  formFieldHelpers: string[] = [''];
  listeSalle:SalleClasse[]=[];
  listeClasse:Classe[]=[] 
  versement:Versement = new Versement({})
  inscription_id
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,private salleClasseService:SalleClasseService,
      private classeService:ClasseService,
      private _inscriptionService: InscriptionsService,
      private _versementService: VersementsService,
      public matDialogRef: MatDialogRef<PaiementComponent>,
      ) {
      this.versement = new Versement(_data.versement);
      if(this.versement.inscription_id){
        this.inscription_id=this.versement.inscription_id
        this.classe_id = _data.versement.classe_id;
      }
   
      this.versement.dateversement =  moment().format('YYYY-MM-DD');
      this.versementForm = this.createPaiementEleveForm();
  }
  versementForm: any;
  listeEleves =[]
  salle_classe_id
  classe_id

  ngOnInit(): void { 

    this.classeService.getAll().subscribe(data=>{
      this.listeClasse = data as Classe[];
      if(this.listeClasse.length>0)
      this.classe_id = this.listeClasse[0].id
    });
  
    this.salleClasseService.getSalleClasseByAnneeAndClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:this.classe_id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
    });
    this._inscriptionService.getAllByAnneeAndClasseAndSalleClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:this.classe_id,salle_classe_id:this.salle_classe_id}).subscribe(data=>{
      this.listeEleves = data;
    })
  }

  filterByClasse(classe_id){
    this.classe_id = classe_id
    this.salleClasseService.getSalleClasseByAnneeAndClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:classe_id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
      if(this.listeSalle.length>0)
      this.salle_classe_id = this.listeSalle[0].id;
    });
    this._inscriptionService.getAllByAnneeAndClasseAndSalleClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:this.classe_id,salle_classe_id:null}).subscribe(data=>{
      this.listeEleves = data;
      console.log(data)
    })
  }
  
  filterByClasseAndSalleClasse(salle_classe_id){
    this.salle_classe_id = salle_classe_id;
    this._inscriptionService.getAllByAnneeAndClasseAndSalleClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:this.classe_id,salle_classe_id:salle_classe_id}).subscribe(data=>{
      this.listeEleves = data;
      console.log(data)
    })
  }
  
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createPaiementEleveForm(): FormGroup {
      return this._formBuilder.group({
          inscription_id: new FormControl({value: this.versement.inscription_id, disabled: !!this.versement.inscription_id}, Validators.required),
          salle_classe_id: [],
          eleve_id: [this.versement.eleve_id],
          dateversement: new FormControl(this.versement.dateversement, Validators.required),
          montant: new FormControl(this.versement.montant, Validators.required),
          classe_id: []
      });
  }
  
  onSubmit() {
 
      let versement = this.versementForm.getRawValue();
      let eleve = this.listeEleves.find(p=>p.id==versement.inscription_id)
      if(eleve) versement['eleve_id'] = eleve.eleve_id;
        this._versementService.addOrUpdate(versement).subscribe(data=>{
            this.matDialogRef.close(this.versementForm);
            console.log(data)
        },err=>{
          console.log(err)
        })
    }
}
