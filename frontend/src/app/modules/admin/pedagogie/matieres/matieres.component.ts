import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { MatiereService } from 'app/core/services/matiere.service';
import { Matiere } from 'app/models/matiere.model';
import { AddMatiereComponent } from './add-matiere/add-matiere.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.scss']
})
export class MatieresComponent implements OnInit {

  displayedColumns: string[] = ['id', 'annee', 'categorie','code','libelle','ordre','creation','actions'];
  dataSource = [];
  dialogRef: any; 
  @ViewChild(MatTable) table: MatTable<Matiere>;
  matiere:Matiere = new Matiere({});
  searchControl: FormControl = new FormControl();
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,private _anneeService:AnneeService,
    private _matDialog: MatDialog,private matiereService:MatiereService) { }
 

  ngOnInit(): void {
      this._updateDataSource();
  }

  _updateDataSource(){
    this.matiereService.getAllByAnnee(this._anneeService.activeAnnee.id).subscribe(data=>this.dataSource=data)
  }

 
  recherche(textRecherche) {
    textRecherche = textRecherche.trim(); // Remove whitespace
    textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = textRecherche;
}
    
  ajouter(): void
  {

      this.dialogRef = this._matDialog.open(AddMatiereComponent, {
        data: {
            matiere: {},
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
  

    editer(matiere: Matiere): void {
      console.log(matiere)
      this.dialogRef = this._matDialog.open(AddMatiereComponent, {
          data: {
              matiere: matiere,
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
 

    supprimer(matiere: Matiere) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de matiere',
          message:
              'Voulez-vous supprimer la matiere ' +
              matiere.libelle +' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
            //***DELETE ONE */
            this.matiereService.delete(matiere).subscribe(data=>{
                console.log(data);
              this._updateDataSource();
            },err=>{
                console.error(err)
            })
          }
      });
    }
}
