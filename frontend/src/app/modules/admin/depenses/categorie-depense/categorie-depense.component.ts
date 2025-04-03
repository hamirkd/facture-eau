import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service'; 
import { CategorieDepenseService } from 'app/core/services/categorie-depense.service'; 
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { AddCategorieDepenseComponent } from './add-categorie-depense/add-categorie-depense.component';

@Component({
    selector: 'app-categorie-depense',
    templateUrl: './categorie-depense.component.html',
    styleUrls: ['./categorie-depense.component.scss'],
})
export class CategorieDepenseComponent implements OnInit {
  constructor(
      private _anneeService: AnneeService,
      private _matDialog: MatDialog,
      private _categorieDepenseService: CategorieDepenseService
  ) {}

  searchControl: FormControl = new FormControl();
  dialogRef: any;

  dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

  displayedColumns: string[] = [
      'id',
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
    this._categorieDepenseService.getAll().subscribe(data=>{
        this.dataSource.data = data;
        console.log(data)
      })
  }
  
  editer(categorieDepense): void
  {
      this.dialogRef = this._matDialog.open(AddCategorieDepenseComponent, {
          panelClass: '',
          data      : {
              categorieDepense:categorieDepense,
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
      this.dialogRef = this._matDialog.open(AddCategorieDepenseComponent, {
          panelClass: '',
          data      : {
              categorieDepense:{},
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
