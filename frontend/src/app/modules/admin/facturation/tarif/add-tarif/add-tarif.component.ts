import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarifService } from 'app/core/services/tarif.service';
import { Tarif } from 'app/models/tarif.model';

@Component({
    selector: 'app-add-tarif',
    templateUrl: './add-tarif.component.html',
    styleUrls: ['./add-tarif.component.scss'],
})
export class AddTarifComponent implements OnInit {
    @Input() name;

    tarif: Tarif;
    action: 'edit' | 'new' = 'new';

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddTarifComponent>,
        public tarifService: TarifService,
    ) {
        this.tarif = new Tarif(_data.tarif);
        this.action = _data.action;
        this.tarifForm = this.createTarifForm();
    }
    tarifForm: any;

    ngOnInit(): void {

    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createTarifForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.tarif.id],
            typetarif: [this.tarif.typetarif],
            montant: [this.tarif.montant],
            redevance: [this.tarif.redevance],
            autres_frais: [this.tarif.autres_frais],
        });
    }
    
    onSubmit() {

      if(this.action=='new')
      {
        let tarif = this.tarifForm.getRawValue();
        this.tarifService.add(tarif).subscribe(data=>{
            this.matDialogRef.close(this.tarifForm);
        },err=>{
          console.log(err)
        })
      }
      else
      {
          this.tarifService.update(this.tarifForm.getRawValue()).subscribe(data=>{
              this.matDialogRef.close(this.tarifForm);
          })
      }
      
  }
}
