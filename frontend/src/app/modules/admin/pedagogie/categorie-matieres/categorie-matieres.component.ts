import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CategorieMatiereService } from 'app/core/services/categorie-matiere.service';
import { CategorieMatiere } from 'app/models/categorie-matiere.model';
import { AddCategorieMatiereComponent } from './add-categorie-matiere/add-categorie-matiere.component';

@Component({
  selector: 'app-categorie-matieres',
  templateUrl: './categorie-matieres.component.html',
  styleUrls: ['./categorie-matieres.component.scss']
})
export class CategorieMatieresComponent implements OnInit {

      displayedColumns: string[] = ['id', 'code','libelle','actions'];
      dataSource = [];
      dialogRef: any; 
      @ViewChild(MatTable) table: MatTable<CategorieMatiere>;
      categorieMatiere:CategorieMatiere = new CategorieMatiere({});
      searchControl: FormControl = new FormControl();

      constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,private categorieMatiereService:CategorieMatiereService) { }
    

      ngOnInit(): void {
          this._updateDataSource();
      }

      _updateDataSource(){
        this.categorieMatiereService.getAlls().subscribe(data=>{
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

          this.dialogRef = this._matDialog.open(AddCategorieMatiereComponent, {
            data: {
                categorieMatiere: {},
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
      

      editer(categorieMatiere: CategorieMatiere): void {
      this.dialogRef = this._matDialog.open(AddCategorieMatiereComponent, {
          data: {
              categorieMatiere: categorieMatiere,
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
    

    supprimer(categorieMatiere: CategorieMatiere) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de categorieMatiere',
          message:
              'Voulez-vous supprimer la categorieMatiere ' +
              categorieMatiere.libelle +' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
            //***DELETE ONE */
            this.categorieMatiereService.delete(categorieMatiere).subscribe(data=>{
                console.log(data);
              this._updateDataSource();
            },err=>{
                console.error(err)
            })
          }
      });
    }
}
