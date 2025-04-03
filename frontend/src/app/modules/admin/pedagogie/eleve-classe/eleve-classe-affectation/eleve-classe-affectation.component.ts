import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { AnneeScolaire } from 'app/models/annee-scolaire.model';
import { Classe } from 'app/models/classe.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { SalleClasse } from 'app/models/salle-classe.model';

@Component({
  selector: 'app-eleve-classe-affectation',
  templateUrl: './eleve-classe-affectation.component.html',
  styleUrls: ['./eleve-classe-affectation.component.scss']
})
export class EleveClasseAffectationComponent implements OnInit {

  
  @Input() name;


  formFieldHelpers: string[] = [''];
  listeSalle:SalleClasse[]=[];
  listeClasse:Classe[]=[]
  inscriptionEleve:InscriptionEleve
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,private salleClasseService:SalleClasseService,
      private classeService:ClasseService,
      private _inscriptionService: InscriptionsService,
      public matDialogRef: MatDialogRef<EleveClasseAffectationComponent>,
      ) {
      this.inscriptionEleve = new InscriptionEleve(_data.inscriptionEleve);
   
      this.eleveClasseAffectation = this.createMatiereSalleClassePersonnelForm();
  }
  eleveClasseAffectation: any;

  ngOnInit(): void {
 

    this.classeService.getAll().subscribe(data=>{
      this.listeClasse = data as Classe[];
    });
  
    this.salleClasseService.getSalleClasseByAnneeAndClasse({annee_id:this.anneeService.activeAnnee.id,classe_id:this.inscriptionEleve.classe_id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
    });
  }
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createMatiereSalleClassePersonnelForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.inscriptionEleve.id],
          salle_classe_id: [this.inscriptionEleve.salle_classe_id],
          annee_id: new FormControl({value: this.inscriptionEleve.annee_id, disabled: true}, Validators.required),
          classe_id: new FormControl({value: this.inscriptionEleve.classe_id, disabled: true}, Validators.required),
      });
  }
  
  onSubmit() {
 
      let inscriptionEleve = this.eleveClasseAffectation.getRawValue();
        this._inscriptionService.update(inscriptionEleve).subscribe(data=>{
            this.matDialogRef.close(this.eleveClasseAffectation);
        },err=>{
          console.log(err)
        })
    }
}
