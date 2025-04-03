import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { CategorieDepenseService } from 'app/core/services/categorie-depense.service';
import { ClasseService } from 'app/core/services/classe.service';
import { DepenseService } from 'app/core/services/depense.service';
import { DesignationDepenseService } from 'app/core/services/designation-depense.service';
import { CategorieDepense } from 'app/models/categorie-depense.model';
import { Classe } from 'app/models/classe.model';
import { Depense } from 'app/models/depense.model';
import { DesignationDepense } from 'app/models/designation-depense.model';
import moment from 'moment';

@Component({
    selector: 'app-add-depense',
    templateUrl: './add-depense.component.html',
    styleUrls: ['./add-depense.component.scss'],
})
export class AddDepenseComponent implements OnInit {
    @Input() name;

    depense: Depense;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddDepenseComponent>,
        public depenseService: DepenseService,private categorieDepenseService:CategorieDepenseService,
        private designationDepenseService:DesignationDepenseService,
        private anneeService:AnneeService
    ) {
        this.depense = new Depense(_data.depense);
        this.action = _data.action;
        this.depense.datedepense =  moment().format('YYYY-MM-DD');
        this.depenseForm = this.createDepenseForm();
    }
    listeCategorieDepense:CategorieDepense[]=[];
    listeDesignationDepense:DesignationDepense[]=[];
    listeDesignationDepenseAll:DesignationDepense[]=[];
    depenseForm: any;
    afficherGroupByLabel
    datefin = moment().format('YYYY-MM-DD');
    ngOnInit(): void {

      this.categorieDepenseService.getAll().subscribe(data=>{
        this.listeCategorieDepense = data as CategorieDepense[];
      })
      this.designationDepenseService.getAll().subscribe(data=>{
        this.listeDesignationDepense = data as DesignationDepense[];
        this.listeDesignationDepenseAll = data as DesignationDepense[];
      })
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createDepenseForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.depense.id],
            categorie_id: [this.depense.categorie_id],
            designation_id: [this.depense.designation_id],
            description: [this.depense.description],
            datedepense: [this.depense.datedepense],
            montant: [this.depense.montant],
        });
    }
    optionClick(designationDepense:DesignationDepense){
      this.afficherGroupByLabel = designationDepense.libelle
    }
    filterDesignation(categorieDepense_id){
      this.listeDesignationDepense = this.listeDesignationDepenseAll.filter(p=>p.categorie_id==categorieDepense_id);
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let depense = this.depenseForm.getRawValue();
        depense.annee_id = this.anneeService.activeAnnee.id;
          this.depenseService.add(depense).subscribe(data=>{
              this.matDialogRef.close(this.depenseForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
          this.depenseService.update(this.depenseForm.getRawValue()).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.depenseForm);
          })
      }
      
  }
}
