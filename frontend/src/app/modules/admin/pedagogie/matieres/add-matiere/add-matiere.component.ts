import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { CategorieMatiereService } from 'app/core/services/categorie-matiere.service';
import { MatiereService } from 'app/core/services/matiere.service';
import { AnneeScolaire } from 'app/models/annee-scolaire.model';
import { CategorieMatiere } from 'app/models/categorie-matiere.model';
import { Matiere } from 'app/models/matiere.model';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.scss']
})
export class AddMatiereComponent implements OnInit {
  @Input() name;

  matiere: Matiere;
  action: 'edit' | 'new' = 'new';

  formFieldHelpers: string[] = [''];
  listeCategorieMatiere:CategorieMatiere[]=[];
  listeAnneeScolaire:AnneeScolaire[]=[];
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,
      public matDialogRef: MatDialogRef<AddMatiereComponent>,
      public matiereService: MatiereService, public categorieMatiereService:CategorieMatiereService) {
      this.matiere = new Matiere(_data.matiere);
      this.action = _data.action;
    if(this.action=='new'){
      this.matiere.annee_id = this.anneeService.activeAnnee.id
    }
      this.matiereForm = this.createMatiereForm();
  }
  matiereForm: any;

  ngOnInit(): void {

    this.categorieMatiereService.getAlls().subscribe(data=>{
      this.listeCategorieMatiere = data as CategorieMatiere[];
    })
    this.anneeService.getAlls().subscribe(data=>{
      this.listeAnneeScolaire = data as AnneeScolaire[];
    })
  }
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createMatiereForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.matiere.id],
          code: [this.matiere.code],
          ordre: [this.matiere.ordre],
          categorie_id: [this.matiere.categorie_id],
          annee_id: new FormControl({value: this.matiere.annee_id, disabled: true}, Validators.required),
          libelle: [this.matiere.libelle],
      });
  }
  
  onSubmit() {

    if(this.action=='new')
    {
      let matiere = this.matiereForm.getRawValue();
        this.matiereService.add(matiere).subscribe(data=>{
            this.matDialogRef.close(this.matiereForm);
        },err=>{
          console.log(err)
        })
    }
    else
    {
        this.matiereService.update(this.matiereForm.getRawValue()).subscribe(data=>{
            console.log(data);
            this.matDialogRef.close(this.matiereForm);
        })
    }
    
}
}
