import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { ScolaritesService } from 'app/core/services/scolarites.service';
import { Classe } from 'app/models/classe.model';
import { Scolarite } from 'app/models/scolarite.model';

@Component({
  selector: 'app-add-scolarisation',
  templateUrl: './add-scolarisation.component.html',
  styleUrls: ['./add-scolarisation.component.scss']
})
export class AddScolarisationComponent implements OnInit {
  @Input() name;

  scolarite: Scolarite;
  action: 'edit' | 'new' = 'new';

  formFieldHelpers: string[] = [''];
  constructor(
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      public matDialogRef: MatDialogRef<AddScolarisationComponent>,
      public scolariteService: ScolaritesService,private classeService:ClasseService,
      private anneeService:AnneeService
  ) {
      this.scolarite = new Scolarite(_data.scolarite);
      this.action = _data.action;
      this.scolariteForm = this.createScolariteForm();
  }
  listeClasse:Classe[]=[];
  scolariteForm: any;

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

  createScolariteForm(): FormGroup {
      return this._formBuilder.group({
          id: [this.scolarite.id],
          classe_id: [this.scolarite.classe_id],
          annee_id: [this.scolarite.annee_id],
          serie: [this.scolarite.serie],
          frais_inscription: [this.scolarite.frais_inscription],
          frais_scolarite: [this.scolarite.frais_scolarite],
          frais_scolarite_affecte: [this.scolarite.frais_scolarite_affecte],
          autres_frais: [this.scolarite.autres_frais],
      });
  }
  
  onSubmit() {

    if(this.action=='new')
    {
      let scolarite = this.scolariteForm.getRawValue();
      scolarite.annee_id = this.anneeService.activeAnnee.id;
        this.scolariteService.addOrUpdate(scolarite).subscribe(data=>{
            this.matDialogRef.close(this.scolariteForm);
        },err=>{
          console.log(err)
        })
    }
    else
    {
        this.scolariteService.addOrUpdate(this.scolariteForm.getRawValue()).subscribe(data=>{
            console.log(data);
            this.matDialogRef.close(this.scolariteForm);
        })
    }
    
}
}
