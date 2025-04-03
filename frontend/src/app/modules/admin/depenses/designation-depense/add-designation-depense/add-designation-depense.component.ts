import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { CategorieDepenseService } from 'app/core/services/categorie-depense.service';
import { ClasseService } from 'app/core/services/classe.service';
import { DesignationDepenseService } from 'app/core/services/designation-depense.service';
import { CategorieDepense } from 'app/models/categorie-depense.model';
import { Classe } from 'app/models/classe.model';
import { DesignationDepense } from 'app/models/designation-depense.model';

@Component({
    selector: 'app-add-designation-depense',
    templateUrl: './add-designation-depense.component.html',
    styleUrls: ['./add-designation-depense.component.scss'],
})
export class AddDesignationDepenseComponent implements OnInit {
    @Input() name;

    designationDepense: DesignationDepense;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddDesignationDepenseComponent>,
        public designationDepenseService: DesignationDepenseService,private categorieDepenseService:CategorieDepenseService,
        private anneeService:AnneeService
    ) {
        this.designationDepense = new DesignationDepense(_data.designationDepense);
        this.action = _data.action;
        this.designationDepenseForm = this.createDesignationDepenseForm();
    }
    listeCategorieDepense:CategorieDepense[]=[];
    designationDepenseForm: any;

    ngOnInit(): void {

      this.categorieDepenseService.getAll().subscribe(data=>{
        this.listeCategorieDepense = data as CategorieDepense[];
      })
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createDesignationDepenseForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.designationDepense.id],
            categorie_id: [this.designationDepense.categorie_id],
            libelle: [this.designationDepense.libelle],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let designationDepense = this.designationDepenseForm.getRawValue();
        designationDepense.annee_id = this.anneeService.activeAnnee.id;
          this.designationDepenseService.add(designationDepense).subscribe(data=>{
              this.matDialogRef.close(this.designationDepenseForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
          this.designationDepenseService.update(this.designationDepenseForm.getRawValue()).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.designationDepenseForm);
          })
      }
      
  }
}
