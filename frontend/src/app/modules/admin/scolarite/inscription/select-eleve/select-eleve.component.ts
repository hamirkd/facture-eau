import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';

@Component({
    selector: 'app-select-eleve',
    templateUrl: './select-eleve.component.html',
    styleUrls: ['./select-eleve.component.scss'],
})
export class SelectEleveComponent implements OnInit {
    constructor(public matDialogRef: MatDialogRef<SelectEleveComponent>,
        private _anneeService:AnneeService,private _inscriptionService:InscriptionsService) {}

    searchControl: FormControl = new FormControl();

    eleves: InscriptionEleve[] = [
    ];
    dataSource:MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'nomprenom',
        'date_naissance',
        'nom_prenom_pere',
        'nom_prenom_mere',
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }
    ngOnInit(): void {
        
        this._inscriptionService.getAllBy({}).subscribe(data=>{
            console.log(data);
            this.eleves = data as InscriptionEleve[];
            
            this.dataSource.data = this.eleves;
        })
    }

    onSelectEleve(eleve: InscriptionEleve) {
        this.matDialogRef.close(eleve);
    }
}
