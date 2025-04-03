import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { Classe } from 'app/models/classe.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { EleveClasseAffectationMasseComponent } from './eleve-classe-affectation-masse/eleve-classe-affectation-masse.component';
import { EleveClasseAffectationComponent } from './eleve-classe-affectation/eleve-classe-affectation.component';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-eleve-classe',
    templateUrl: './eleve-classe.component.html',
    styleUrls: ['./eleve-classe.component.scss'],
})
export class EleveClasseComponent implements OnInit {
    listeSalle: SalleClasse[] = [];
    listeClasse: Classe[] = [];
    salle_classe_id = 0;
    classe_id = 0;
    dialogRef: any; 
    data:any={}
    constructor(
        private _anneeService: AnneeService,
        private salleClasseService: SalleClasseService,
        private _inscriptionService: InscriptionsService,
        private classeService: ClasseService,
        private _matDialog: MatDialog,
    ) {}

    searchControl: FormControl = new FormControl();

    eleves: InscriptionEleve[] = [];
    dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'nom',
        'prenom',
        'date_naissance',
        'genre',
        'telephone',
        'niveau',
        'salleclasse',
        'actions',
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }

    ngOnInit(): void {
        // this._inscriptionService
        //     .getAllBy({ annee_id: this._anneeService.activeAnnee.id })
        //     .subscribe((data) => {
        //         this.eleves = data as InscriptionEleve[];
        //         this.dataSource.data = this.eleves;
        //     });
        // this._updateDataSource();

        this.salleClasseService
            .getSalleClasseByAnnee({
                annee_id: this._anneeService.activeAnnee.id,
            })
            .subscribe((data) => {
                this.listeSalle = data as SalleClasse[];
            });

        this.classeService
            .getAll()
            .subscribe((data) => {
                this.listeClasse = data as Classe[];
            });
    }

    filtreByClasse(classe_id) {
        this.classe_id = classe_id;
        if(classe_id!=0)
        this.salleClasseService
            .getSalleClasseByAnneeAndClasse({
                annee_id: this._anneeService.activeAnnee.id,
                classe_id:classe_id
            })
            .subscribe((data) => {
                this.listeSalle = []
                this.listeSalle = data as SalleClasse[];
            });
        this._updateDataSource();
    }

    filtreBySalleClasse(salle_classe_id) {
        this.salle_classe_id = salle_classe_id;
        this._updateDataSource();
    }

    _updateDataSource() {
        if(this.classe_id==0){
            this.dataSource.data = [];return;
        }
        this.data['actualiser2']=true;
        this._inscriptionService
            .getAllByAnneeAndClasseAndSalleClasse({
                annee_id: this._anneeService.activeAnnee.id,
                salle_classe_id: this.salle_classe_id,classe_id:this.classe_id
            })
            .subscribe((data) => {
                let data2 = data as InscriptionEleve[];
                data2.forEach((d) => {
                    if (d.classe)d['classel'] =d.classe.libelle;
                    if (d.salle_classe)d['salleclassel'] =d.salle_classe.libelle;
                });
                this.dataSource.data = data2;
                
        this.data['actualiser2']=false;
            },err=>{
                
        this.data['actualiser2']=false;
            });
    }
    // reaffecter
    
    reaffecter(inscriptionEleve: InscriptionEleve): void {
    this.dialogRef = this._matDialog.open(EleveClasseAffectationComponent, {
        data: {
            inscriptionEleve: inscriptionEleve,
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
  affectation(){
    
    this.dialogRef = this._matDialog.open(EleveClasseAffectationMasseComponent, {
        data: {
        },
    });
  
    this.dialogRef.afterClosed().subscribe((response: any) => {
        if (!response) {
            return;
        }
        this._updateDataSource();
    });
  }

  imprimerliste(){
    this.data['actualiser2']=true;
    this._inscriptionService
    .getImprimeAllByAnneeAndClasseAndSalleClasse({
        annee_id: this._anneeService.activeAnnee.id,
        salle_classe_id: this.salle_classe_id,classe_id:this.classe_id
    })
    .subscribe((data) => {
        this.data['actualiser2']=false;
        saveAs(data,`ETAT_${this.salle_classe_id}_${this._anneeService.activeAnnee.annee}.docx`);

    },err=>{this.data['actualiser2']=false;});
  }
}
