import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { CategorieDepenseService } from 'app/core/services/categorie-depense.service';
import { Classe } from 'app/models/classe.model';
import { CategorieDepense } from 'app/models/categorie-depense.model';

@Component({
    selector: 'app-categorie-depense',
    templateUrl: './add-categorie-depense.component.html',
    styleUrls: ['./add-categorie-depense.component.scss'],
})
export class AddCategorieDepenseComponent implements OnInit {
    @Input() name;

    categorieDepense: CategorieDepense;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddCategorieDepenseComponent>,
        public categorieDepenseService: CategorieDepenseService,private classeService:ClasseService,
        private anneeService:AnneeService
    ) {
        this.categorieDepense = new CategorieDepense(_data.categorieDepense);
        this.action = _data.action;
        this.categorieDepenseForm = this.createCategorieDepenseForm();
    }
    listeClasse:Classe[]=[];
    categorieDepenseForm: any;

    ngOnInit(): void {

      this.classeService.getAll().subscribe(data=>{
        this.listeClasse = data as Classe[];
        console.log(data)
      })
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createCategorieDepenseForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.categorieDepense.id],    
            libelle: [this.categorieDepense.libelle],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let categorieDepense = this.categorieDepenseForm.getRawValue();
        categorieDepense.annee_id = this.anneeService.activeAnnee.id;
          this.categorieDepenseService.add(categorieDepense).subscribe(data=>{
              this.matDialogRef.close(this.categorieDepenseForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
          this.categorieDepenseService.update(this.categorieDepenseForm.getRawValue()).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.categorieDepenseForm);
          })
      }
      
  }
}
