import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { PosteService } from 'app/core/services/poste.service';
import { Poste } from 'app/models/poste.model';

@Component({
  selector: 'app-add-postes',
  templateUrl: './add-postes.component.html',
  styleUrls: ['./add-postes.component.scss']
})
export class AddPosteComponent implements OnInit {
  @Input() name;

  poste: Poste;
  action: 'edit' | 'new' = 'new';

  formFieldHelpers: string[] = [''];
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,
      public matDialogRef: MatDialogRef<AddPosteComponent>,
      public posteService: PosteService) {
      this.poste = new Poste(_data.poste);
      this.action = _data.action;
    
      this.posteForm = this.createPosteForm();
  }
  posteForm: any;

  ngOnInit(): void {

  }
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createPosteForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.poste.id],
          libelle: [this.poste.libelle, Validators.required],
      });
  }
  
  onSubmit() {

    if(this.action=='new')
    {
      let poste = this.posteForm.getRawValue();
        this.posteService.add(poste).subscribe(data=>{
            this.matDialogRef.close(this.posteForm);
        },err=>{
          console.log(err)
        })
    }
    else
    {
        this.posteService.update(this.posteForm.getRawValue()).subscribe(data=>{
            console.log(data);
            this.matDialogRef.close(this.posteForm);
        })
    }
    
}
}
