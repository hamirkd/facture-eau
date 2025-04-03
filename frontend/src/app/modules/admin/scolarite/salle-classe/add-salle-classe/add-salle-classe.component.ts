import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { Classe } from 'app/models/classe.model';
import { SalleClasse } from 'app/models/salle-classe.model';

@Component({
    selector: 'app-add-salle-classe',
    templateUrl: './add-salle-classe.component.html',
    styleUrls: ['./add-salle-classe.component.scss'],
})
export class AddSalleClasseComponent implements OnInit {
    @Input() name;

    salleClasse: SalleClasse;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddSalleClasseComponent>,
        public salleClasseService: SalleClasseService,private classeService:ClasseService,
        private anneeService:AnneeService
    ) {
        this.salleClasse = new SalleClasse(_data.salleClasse);
        this.action = _data.action;
        this.salleClasseForm = this.createSalleClasseForm();
    }
    listeClasse:Classe[]=[];
    salleClasseForm: any;

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

    createSalleClasseForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.salleClasse.id],
            classe_id: [this.salleClasse.classe_id],
            annee_id: [this.salleClasse.annee_id],
            serie: [this.salleClasse.serie],
            code: [this.salleClasse.code],
            libelle: [this.salleClasse.libelle],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let salleClasse = this.salleClasseForm.getRawValue();
        salleClasse.annee_id = this.anneeService.activeAnnee.id;
          this.salleClasseService.add(salleClasse).subscribe(data=>{
              this.matDialogRef.close(this.salleClasseForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
          this.salleClasseService.update(this.salleClasseForm.getRawValue()).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.salleClasseForm);
          })
      }
      
  }
}
