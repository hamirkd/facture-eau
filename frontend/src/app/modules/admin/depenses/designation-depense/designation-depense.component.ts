import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { DesignationDepenseService } from 'app/core/services/designation-depense.service';
import { ScolaritesService } from 'app/core/services/scolarites.service';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { AddDesignationDepenseComponent } from './add-designation-depense/add-designation-depense.component';

@Component({
    selector: 'app-designation-depense',
    templateUrl: './designation-depense.component.html',
    styleUrls: ['./designation-depense.component.scss'],
})
export class DesignationDepenseComponent implements OnInit {
  constructor(
      private _anneeService: AnneeService,
      private _matDialog: MatDialog,
      private _designationDepenseService: DesignationDepenseService
  ) {}

  searchControl: FormControl = new FormControl();
  dialogRef: any;

  dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

  displayedColumns: string[] = [
      'id',
      'categorie', 
      'libelle', 
      'creation',
      'actions',
  ];

  recherche(textRecherche) {
      textRecherche = textRecherche.trim(); // Remove whitespace
      textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = textRecherche;
  }
  ngOnInit(): void {
      this._updateDataSource();
  }
  
  _updateDataSource(){
    this._designationDepenseService.getAll().subscribe(data=>{
        this.dataSource.data = data;
        console.log(data)
      })
  }
  
  editer(designationDepense): void
  {
      this.dialogRef = this._matDialog.open(AddDesignationDepenseComponent, {
          panelClass: '',
          data      : {
              designationDepense:designationDepense,
              action: 'edit'
          } 
      });

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }
              
              this._updateDataSource();
          });
  }
  
  ajouter(): void
  {
      this.dialogRef = this._matDialog.open(AddDesignationDepenseComponent, {
          panelClass: '',
          data      : {
              designationDepense:{},
              action: 'new'
          } 
      });

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }
              
              this._updateDataSource();
          });
  }
  supprimer(){}
}
