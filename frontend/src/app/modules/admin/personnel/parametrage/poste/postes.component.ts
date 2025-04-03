import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { PosteService } from 'app/core/services/poste.service';
import { Poste } from 'app/models/poste.model';
import { AddPosteComponent } from './add-poste/add-postes.component';

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle','creation','actions'];
  dataSource = [];
  dialogRef: any; 
  @ViewChild(MatTable) table: MatTable<Poste>;
  poste:Poste = new Poste({});
  searchControl: FormControl = new FormControl();
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,private _anneeService:AnneeService,
    private _matDialog: MatDialog,private posteService:PosteService) { }
 

  ngOnInit(): void {
      this._updateDataSource();
  }

  _updateDataSource(){
    this.posteService.getAlls().subscribe(data=>this.dataSource=data)
  }

 
  recherche(textRecherche) {
    textRecherche = textRecherche.trim(); // Remove whitespace
    textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = textRecherche;
}
    
  ajouter(): void
  {

      this.dialogRef = this._matDialog.open(AddPosteComponent, {
        data: {
            poste: {},
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
  

    editer(poste: Poste): void {
      console.log(poste)
      this.dialogRef = this._matDialog.open(AddPosteComponent, {
          data: {
              poste: poste,
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
 

    supprimer(poste: Poste) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de poste',
          message:
              'Voulez-vous supprimer la poste ' +
              poste.libelle +' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
            //***DELETE ONE */
            this.posteService.delete(poste).subscribe(data=>{
                console.log(data);
              this._updateDataSource();
            },err=>{
                console.error(err)
            })
          }
      });
    }
}
