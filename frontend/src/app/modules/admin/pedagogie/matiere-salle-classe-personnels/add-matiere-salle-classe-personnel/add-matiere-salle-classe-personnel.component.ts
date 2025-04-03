import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { CategorieMatiereService } from 'app/core/services/categorie-matiere.service';
import { MatiereSalleClassePersonnelService } from 'app/core/services/matiere-salle-classe-personnel.service';
import { MatiereService } from 'app/core/services/matiere.service';
import { PersonnelService } from 'app/core/services/personnel.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { AnneeScolaire } from 'app/models/annee-scolaire.model';
import { CategorieMatiere } from 'app/models/categorie-matiere.model';
import { MatiereSalleClassePersonnel } from 'app/models/matiere-salle-classe-personnel.model';
import { Matiere } from 'app/models/matiere.model';
import { Personnel } from 'app/models/personnel.model';
import { SalleClasse } from 'app/models/salle-classe.model';

@Component({
  selector: 'app-add-matiere-salle-classe-personnel',
  templateUrl: './add-matiere-salle-classe-personnel.component.html',
  styleUrls: ['./add-matiere-salle-classe-personnel.component.scss']
})
export class AddMatiereSalleClassePersonnel implements OnInit {

  @Input() name;

  matiereSalleClassePersonnel: MatiereSalleClassePersonnel;
  action: 'edit' | 'new' = 'new';

  formFieldHelpers: string[] = [''];
  listeAnneeScolaire:AnneeScolaire[]=[];
  listePersonnel:Personnel[]=[];
  listeMatiere:Matiere[]=[];
  listeSalle:SalleClasse[]=[];
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,private salleClasseService:SalleClasseService,
      public matDialogRef: MatDialogRef<AddMatiereSalleClassePersonnel>,private matiereSalleClassePersonnelService:MatiereSalleClassePersonnelService,
      public matiereService: MatiereService,
      private personnelService:PersonnelService
      ) {
      this.matiereSalleClassePersonnel = new MatiereSalleClassePersonnel(_data.matiereSalleClassePersonnel);
      this.action = _data.action;
    if(this.action=='new'){
      this.matiereSalleClassePersonnel.annee_id = this.anneeService.activeAnnee.id
    }
      this.matiereSalleClassePersonnelForm = this.createMatiereSalleClassePersonnelForm();
  }
  matiereSalleClassePersonnelForm: any;

  ngOnInit(): void {
 

    this.anneeService.getAlls().subscribe(data=>{
      this.listeAnneeScolaire = data as AnneeScolaire[];
    })
    this.personnelService.getAlls().subscribe(data=>{
      this.listePersonnel = data as Personnel[];
    })
    this.matiereService.getAllByAnnee(this.anneeService.activeAnnee.id).subscribe(data=>{
      this.listeMatiere = data as Matiere[];
    })
    this.salleClasseService.getSalleClasseByAnnee({annee_id:this.anneeService.activeAnnee.id}).subscribe(data=>{
      this.listeSalle = data as SalleClasse[];
    })
  }
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createMatiereSalleClassePersonnelForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.matiereSalleClassePersonnel.id],
          matiere_id: [this.matiereSalleClassePersonnel.matiere_id],
          categorie_id: [this.matiereSalleClassePersonnel.matiere?this.matiereSalleClassePersonnel.matiere.categorie_id:''],
          salle_classe_id: [this.matiereSalleClassePersonnel.salle_classe_id],
          personnel_id: [this.matiereSalleClassePersonnel.personnel_id],
          coefficient: [this.matiereSalleClassePersonnel.coefficient],
          annee_id: new FormControl({value: this.matiereSalleClassePersonnel.annee_id, disabled: true}, Validators.required),
      });
  }
  
  onSubmit() {

    if(this.action=='new')
    {
      let matiereSalleClassePersonnel = this.matiereSalleClassePersonnelForm.getRawValue();
      console.log(matiereSalleClassePersonnel);
        this.matiereSalleClassePersonnelService.add(matiereSalleClassePersonnel).subscribe(data=>{
            this.matDialogRef.close(this.matiereSalleClassePersonnelForm);
        },err=>{
          console.log(err)
        })
    }
    else
    {
        this.matiereSalleClassePersonnelService.update(this.matiereSalleClassePersonnelForm.getRawValue()).subscribe(data=>{
            console.log(data);
            this.matDialogRef.close(this.matiereSalleClassePersonnelForm);
        })
    }
    
}
}
