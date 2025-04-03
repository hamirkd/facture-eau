import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service'; 
import { SalleClasseService } from 'app/core/services/salle-classe.service'; 
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { AddSalleClasseComponent } from './add-salle-classe/add-salle-classe.component';

@Component({
    selector: 'app-salle-classe',
    templateUrl: './salle-classe.component.html',
    styleUrls: ['./salle-classe.component.scss'],
})
export class SalleClasseComponent implements OnInit {
  constructor(
      private _anneeService: AnneeService,
      private _matDialog: MatDialog,
      private _salleClasseService: SalleClasseService
  ) {}

  searchControl: FormControl = new FormControl();
  dialogRef: any;

  dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

  displayedColumns: string[] = [
      'id',
      'annee',
      'niveau',
      'code',
      'libelle',
      'serie',
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
    this._salleClasseService.getSalleClasseByAnnee({annee_id:this._anneeService.activeAnnee}).subscribe(data=>{
        this.dataSource.data = data;
        console.log(data)
      })
  }
  
  editer(salleClasse): void
  {
      this.dialogRef = this._matDialog.open(AddSalleClasseComponent, {
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
      this.dialogRef = this._matDialog.open(AddSalleClasseComponent, {
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
  supprimer(){}
}
