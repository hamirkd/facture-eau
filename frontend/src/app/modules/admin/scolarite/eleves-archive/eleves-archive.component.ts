import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { ElevesService } from 'app/core/services/eleves.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { Eleve } from 'app/models/eleve.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
@Component({
  selector: 'app-eleves-archive',
  templateUrl: './eleves-archive.component.html',
  styleUrls: ['./eleves-archive.component.scss']
})
export class ElevesArchiveComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort) sort : MatSort;
  dialogRef: any;
  constructor(private _eleveService:ElevesService,
    private _fuseConfirmationService: FuseConfirmationService,private _anneeService:AnneeService,private _inscriptionService:InscriptionsService,private _liveAnnouncer:LiveAnnouncer) {}

searchControl: FormControl = new FormControl();
eleves: Eleve[] = [];
dataSource:MatTableDataSource<Eleve> = new MatTableDataSource();
annee_id:any;
displayedColumns: string[] = [
    'id',
    'inscriptionVerif',
    'matricule',
    'nomprenom',
    'date_naissance',
    'genre',
    'telephone',
    'niveau',
    'nom_prenom_pere',
    'nom_prenom_mere',
    'actions',
];

ngAfterViewInit(){
  this.dataSource.sort = this.sort;
}
 

recherche(textRecherche) {
    textRecherche = textRecherche.trim(); // Remove whitespace
    textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = textRecherche;
}
ngOnInit(): void {
    this.annee_id = this._anneeService.activeAnnee.id
    this._eleveService.getAllWithInscription().subscribe(data=>{
        this.eleves = data as Eleve[];
        this.dataSource.data = this.eleves;
    })
}

supprimer(element: Eleve) {
  this.dialogRef = this._fuseConfirmationService.open({
      title: 'Suppression de document',
      message: 'Voulez-vous supprimer le document N ' + element.id + ' ?',
      actions:{
        confirm:{label:"Confirmer"},
        cancel:{label:"Annuler"}
      }
  });

  this.dialogRef.afterClosed().subscribe((response) => {
      if (response === 'confirmed') {
          //***DELETE ONE */
          this._eleveService.delete(element).subscribe((data) => {
            console.log(data)
              this.ngOnInit();

          });
      }
  });
}


}
