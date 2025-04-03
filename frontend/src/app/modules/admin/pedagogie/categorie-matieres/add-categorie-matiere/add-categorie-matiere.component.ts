import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { CategorieMatiereService } from 'app/core/services/categorie-matiere.service';
import { CategorieMatiere } from 'app/models/categorie-matiere.model';

@Component({
  selector: 'app-add-categorie-matiere',
  templateUrl: './add-categorie-matiere.component.html',
  styleUrls: ['./add-categorie-matiere.component.scss']
})
export class AddCategorieMatiereComponent implements OnInit {
  @Input() name;

    categorieMatiere: CategorieMatiere;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddCategorieMatiereComponent>,
        public categorieMatiereService: CategorieMatiereService    ) {
        this.categorieMatiere = new CategorieMatiere(_data.categorieMatiere);
        this.action = _data.action;
        this.categorieMatiereForm = this.createCategorieMatiereForm();
    }
    categorieMatiereForm: any;

    ngOnInit(): void {
 
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createCategorieMatiereForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.categorieMatiere.id],
            code: [this.categorieMatiere.code],
            libelle: [this.categorieMatiere.libelle],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let categorieMatiere = this.categorieMatiereForm.getRawValue();
          this.categorieMatiereService.add(categorieMatiere).subscribe(data=>{
              this.matDialogRef.close(this.categorieMatiereForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
          this.categorieMatiereService.update(this.categorieMatiereForm.getRawValue()).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.categorieMatiereForm);
          })
      }
      
  }
}
