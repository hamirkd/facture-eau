import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SubdivisionScolaireService } from 'app/core/services/subdivision-scolaire.service';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';
import { AddSubdivisionScolaireComponent } from './add-categorie-matiere/add-subdivision-scolaire.component';
import { AnneeService } from 'app/core/services/annee.service';
 
@Component({
  selector: 'app-subdivision-scolaire',
  templateUrl: './subdivision-scolaire.component.html',
  styleUrls: ['./subdivision-scolaire.component.scss']
})
export class SubdivisionScolaireComponent implements OnInit {

      displayedColumns: string[] = ['id', 'code','libelle','statut','actions'];
      dataSource = [];
      dialogRef: any; 
      @ViewChild(MatTable) table: MatTable<SubdivisionScolaire>;
      subdivisionScolaire:SubdivisionScolaire = new SubdivisionScolaire({});
      searchControl: FormControl = new FormControl();

      constructor(
        private _fuseConfirmationService: FuseConfirmationService,private anneeScolaire:AnneeService,
        private _matDialog: MatDialog,private subdivisionScolaireService:SubdivisionScolaireService) { }
    

      ngOnInit(): void {
          this._updateDataSource();
      }

      _updateDataSource(){
        this.subdivisionScolaireService.getAll().subscribe(data=>{
          this.dataSource = data;
        })
      }
 
      recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }

      ajouter(): void
      {

          this.dialogRef = this._matDialog.open(AddSubdivisionScolaireComponent, {
            data: {
                subdivisionScolaire: {},
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
      

      editer(subdivisionScolaire: SubdivisionScolaire): void {
      this.dialogRef = this._matDialog.open(AddSubdivisionScolaireComponent, {
          data: {
              subdivisionScolaire: subdivisionScolaire,
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
    supprimer(subdivisionScolaire: SubdivisionScolaire) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de subdivisionScolaire',
          message:
              'Voulez-vous supprimer la subdivisionScolaire ' +
              subdivisionScolaire.libelle +' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
            //***DELETE ONE */
            this.subdivisionScolaireService.delete(subdivisionScolaire).subscribe(data=>{
                console.log(data);
              this._updateDataSource();
            },err=>{
                console.error(err)
            })
          }
      });
    }
}
