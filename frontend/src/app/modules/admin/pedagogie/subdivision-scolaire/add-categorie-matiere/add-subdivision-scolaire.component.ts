import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { SubdivisionScolaireService } from 'app/core/services/subdivision-scolaire.service';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';

@Component({
  selector: 'app-add-subdivision-scolaire',
  templateUrl: './add-subdivision-scolaire.component.html',
  styleUrls: ['./add-subdivision-scolaire.component.scss']
})
export class AddSubdivisionScolaireComponent implements OnInit {
  @Input() name;

    subdivisionScolaire: SubdivisionScolaire;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(private anneeScolaire:AnneeService,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddSubdivisionScolaireComponent>,
        public subdivisionScolaireService: SubdivisionScolaireService    ) {
        this.subdivisionScolaire = new SubdivisionScolaire(_data.subdivisionScolaire);
        this.action = _data.action;
        this.subdivisionScolaireForm = this.createSubdivisionScolaireForm();
    }
    subdivisionScolaireForm: any;

    ngOnInit(): void {
 
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createSubdivisionScolaireForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.subdivisionScolaire.id],
            code: [this.subdivisionScolaire.code],
            annee_id: [this.subdivisionScolaire.annee_id],
            libelle: [this.subdivisionScolaire.libelle],
            lecture: [this.subdivisionScolaire.lecture],
            ecriture: [this.subdivisionScolaire.ecriture],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let subdivisionScolaire:SubdivisionScolaire = this.subdivisionScolaireForm.getRawValue();
        subdivisionScolaire.annee_id = this.anneeScolaire.activeAnnee.annee;
        if(!subdivisionScolaire.lecture)subdivisionScolaire.ecriture=false;
          this.subdivisionScolaireService.add(subdivisionScolaire).subscribe(data=>{
              this.matDialogRef.close(this.subdivisionScolaireForm);
          },err=>{
            console.log(err)
          })
      }
      else
      {
        let subdivisionScolaire:SubdivisionScolaire = this.subdivisionScolaireForm.getRawValue();
        if(!subdivisionScolaire.lecture)subdivisionScolaire.ecriture=false;
          this.subdivisionScolaireService.update(subdivisionScolaire).subscribe(data=>{
              console.log(data);
              this.matDialogRef.close(this.subdivisionScolaireForm);
          })
      }
      
  }
}
