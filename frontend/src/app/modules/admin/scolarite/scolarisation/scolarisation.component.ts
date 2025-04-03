import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { ScolaritesService } from 'app/core/services/scolarites.service';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { Scolarite } from 'app/models/scolarite.model';
import { AddScolarisationComponent } from './add-scolarisation/add-scolarisation.component';

@Component({
    selector: 'app-scolarisation',
    templateUrl: './scolarisation.component.html',
    styleUrls: ['./scolarisation.component.scss'],
})
export class ScolarisationComponent implements OnInit {
    constructor(
        private _anneeService: AnneeService,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private _scolariteService: ScolaritesService
    ) {}

    searchControl: FormControl = new FormControl();
    dialogRef: any;

    
    dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'annee',
        'classe',
        'serie',
        'frais_inscription',
        'frais_scolarite',
        'frais_scolarite_affecte',
        'autres_frais',
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
    this._scolariteService.getAllByAnnee({annee_id:this._anneeService.activeAnnee}).subscribe(data=>{
        this.dataSource.data = data;
      })
  }
  
  ajouter(): void
  {
      this.dialogRef = this._matDialog.open(AddScolarisationComponent, {
          panelClass: '',
          data      : {
              scolarite:{},
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
  
  editer(scolarite:Scolarite): void
  {
      this.dialogRef = this._matDialog.open(AddScolarisationComponent, {
          panelClass: '',
          data      : {
              scolarite:scolarite,
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
  
    
supprimer(element: Scolarite) {
    this.dialogRef = this._fuseConfirmationService.open({
        title: 'Suppression de scolarité',
        message:
            'Voulez-vous supprimer cette scolarité ?',
    });
    this.dialogRef.afterClosed().subscribe((response) => {
        console.log(response);
        if (response === 'confirmed') {
            this._scolariteService.delete(element).subscribe(data=>{
                this._updateDataSource();
            })
        }
    });
}
}
