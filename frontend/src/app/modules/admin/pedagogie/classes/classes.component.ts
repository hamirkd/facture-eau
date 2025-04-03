import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { SalleClasse } from 'app/models/salle-classe.model';
import { AddSalleClasseComponent } from './add-salle-classe/add-salle-classe.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'niveau','libelle','actions'];
  dataSource = [];
  dialogRef: any; 
  @ViewChild(MatTable) table: MatTable<SalleClasse>;
  salleClasse:SalleClasse = new SalleClasse({});
  salleClasseForm :any
  constructor(private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _matDialog: MatDialog,private salleClasseService:SalleClasseService) { }
 

  ngOnInit(): void {
      this._updateDataSource();
      this.salleClasseForm = this.createsalleClasseForm();
  }

  _updateDataSource(){
    this.dataSource = this.salleClasseService.getAll();
  }

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
     createsalleClasseForm(): FormGroup {
      return this._formBuilder.group({
       id:[this.salleClasse.id],
       niveau:[this.salleClasse.classe_id],
       libelle:[this.salleClasse.libelle]
      });
  }
  add(): void
  {

      this.dialogRef = this._matDialog.open(AddSalleClasseComponent, {
        data: {
            salleClasse: {},
            action: 'new',
        }});

      this.dialogRef.afterClosed()
          .subscribe((response: any) => {
              if ( !response )
              {
                  return;
              }
              this._updateDataSource();
          });
  }
  

edit(salleClasse: SalleClasse): void {
  this.dialogRef = this._matDialog.open(AddSalleClasseComponent, {
      data: {
          salleClasse: salleClasse,
          action: 'edit',
      },
  });

  this.dialogRef.afterClosed().subscribe((response: any) => {
      if (!response) {
          return;
      }
      this._updateDataSource();
  });
}
 

supprimer(salleClasse: SalleClasse) {
  this.dialogRef = this._fuseConfirmationService.open({
      title: 'Suppression de salleClasse',
      message:
          'Voulez-vous supprimer la salleClasse ' +
          salleClasse.libelle +' ?',
  });
  this.dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response === 'confirmed') {
         //***DELETE ONE */
         this.salleClasseService.delete(salleClasse).subscribe(data=>{
             console.log(data);
          this._updateDataSource();
         },err=>{
             console.error(err)
         })
      }
  });
}
}
