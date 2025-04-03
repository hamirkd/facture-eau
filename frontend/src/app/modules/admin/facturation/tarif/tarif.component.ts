import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tarif } from 'app/models/tarif.model';
import { AddTarifComponent } from './add-tarif/add-tarif.component';
import { TarifService } from 'app/core/services/tarif.service';

@Component({
    selector: 'app-tarif',
    templateUrl: './tarif.component.html',
    styleUrls: ['./tarif.component.scss'],
})
export class TarifComponent implements OnInit {
  constructor(
      private _matDialog: MatDialog,
      private _tarifService: TarifService
  ) {}

  searchControl: FormControl = new FormControl();
  dialogRef: any;

  dataSource: MatTableDataSource<Tarif> = new MatTableDataSource();

  displayedColumns: string[] = [
      'id',
      'montant',
      'redevance',
      'autres_frais',
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
    this._tarifService.getAll().subscribe(data=>{
        this.dataSource.data = data;
        console.log(data)
      })
  }
  
  editer(salleClasse): void
  {
      this.dialogRef = this._matDialog.open(AddTarifComponent, {
          panelClass: '',
          data      : {
              salleClasse:salleClasse,
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
      this.dialogRef = this._matDialog.open(AddTarifComponent, {
          panelClass: '',
          data      : {
              salleClasse:{},
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
  supprimer(element: Tarif) {
    this._tarifService.delete(element).subscribe(data=>{
        this.dataSource.data = data;
        console.log(data)
      })
  }
}
