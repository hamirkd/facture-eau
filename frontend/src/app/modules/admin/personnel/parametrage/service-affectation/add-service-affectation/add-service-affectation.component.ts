import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ServiceAffectationService } from 'app/core/services/service-affectation.service';
import { ServiceAffectation } from 'app/models/service-affectation.model';

@Component({
  selector: 'app-add-service-affectation',
  templateUrl: './add-service-affectation.component.html',
  styleUrls: ['./add-service-affectation.component.scss']
})
export class AddServiceAffectationComponent implements OnInit {
  @Input() name;

  serviceAffectation: ServiceAffectation;
  action: 'edit' | 'new' = 'new';

  formFieldHelpers: string[] = [''];
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,private anneeService:AnneeService,
      public matDialogRef: MatDialogRef<AddServiceAffectationComponent>,
      public serviceAffectationService: ServiceAffectationService) {
      this.serviceAffectation = new ServiceAffectation(_data.serviceAffectation);
      this.action = _data.action;
    
      this.serviceAffectationForm = this.createServiceAffectationForm();
  }
  serviceAffectationForm: any;

  ngOnInit(): void {

  }
  /**
   * Create user form
   *
   * @returns {FormGroup}
   */

  createServiceAffectationForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.serviceAffectation.id],
          libelle: [this.serviceAffectation.libelle, Validators.required],
      });
  }
  
  onSubmit() {

    if(this.action=='new')
    {
      let serviceAffectation = this.serviceAffectationForm.getRawValue();
        this.serviceAffectationService.add(serviceAffectation).subscribe(data=>{
            this.matDialogRef.close(this.serviceAffectationForm);
        },err=>{
          console.log(err)
        })
    }
    else
    {
        this.serviceAffectationService.update(this.serviceAffectationForm.getRawValue()).subscribe(data=>{
            console.log(data);
            this.matDialogRef.close(this.serviceAffectationForm);
        })
    }
    
}
}
