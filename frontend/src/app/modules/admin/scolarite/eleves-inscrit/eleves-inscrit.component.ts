import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';

@Component({
  selector: 'app-eleves-inscrit',
  templateUrl: './eleves-inscrit.component.html',
  styleUrls: ['./eleves-inscrit.component.scss']
})
export class ElevesInscritComponent implements OnInit,AfterViewInit {

  constructor(private _anneeService:AnneeService,private _inscriptionService:InscriptionsService) {}

searchControl: FormControl = new FormControl();

@ViewChild(MatSort) sort : MatSort;
eleves: InscriptionEleve[] = [];
dataSource:MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

displayedColumns: string[] = [
    'id',
    'matricule',
    'nomprenom',
    'date_naissance',
    'genre',
    'telephone',
    'niveau',
    'nom_prenom_pere',
    'nom_prenom_mere',
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
    
    this._inscriptionService.getAllBy({annee_id:this._anneeService.activeAnnee.id}).subscribe(data=>{
        this.eleves = data as InscriptionEleve[];let i=0;
        this.eleves.forEach(d=>{i++;d['nomprenom']=d.nom+" "+d.prenom;d.id=i;})
        this.dataSource.data = this.eleves;
    })
}

}
