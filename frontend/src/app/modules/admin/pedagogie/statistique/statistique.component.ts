import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { ClasseService } from 'app/core/services/classe.service';
import { EvaluationTravailService } from 'app/core/services/evaluation-travail.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { VersementsService } from 'app/core/services/versements.service';
import { Classe } from 'app/models/classe.model';
import { EvaluationTravail } from 'app/models/evaluation-travail.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { SalleClasse } from 'app/models/salle-classe.model';
import { saveAs } from 'file-saver';
import { StatisticDetailComponent } from './statistic-detail/statistic-detail.component';

@Component({
    selector: 'app-statistique',
    templateUrl: './statistique.component.html',
    styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {
    dialogRef: any;
    data: any = {};
    trimestre: FormControl = new FormControl();

    constructor(
        private _anneeService: AnneeService,
        private _snackBar: MatSnackBar,
        private salleClasseService: SalleClasseService,
        private _versementsService: VersementsService,
        private classeService: ClasseService,
        private _matDialog: MatDialog,
        private _evaluationTravailService: EvaluationTravailService
    ) {}

    searchControl: FormControl = new FormControl();

    eleves: InscriptionEleve[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    displayedColumns: string[] = [
        'id',
        'salleclasse',
        'trimestre',
        'moyenneclasse',
        'effectif',
        'actions',
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }

    ngOnInit(): void {
        // this._versementsService
        //     .getAllBy({ annee_id: this._anneeService.activeAnnee.id })
        //     .subscribe((data) => {
        //         this.eleves = data as InscriptionEleve[];
        //         this.dataSource.data = this.eleves;
        //     });
        // this._updateDataSource();
    }

    generationStatistic() {
        
        if(!this.trimestre.value||this.trimestre.value.length==0)
        {
            this._snackBar.open('Veuillez choisir le trimestre', 'Splash', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration:2000
                });
                return;
        }
        this.data['btn2'] = true;
        this._evaluationTravailService
            .generationStatistic(
                new EvaluationTravail({
                    annee_id: this._anneeService.activeAnnee.id,
                    trimestre: this.trimestre.value,
                })
            )
            .subscribe(
                (data) => {
                    this.data['btn2'] = false;
                    console.log(data);
                },
                (err) => {
                    console.log(err);
                    this.data['btn2'] = false;
                }
            );
    }

    _updateDataSource() {
        this.data['actualiser2'] = true;
        this._evaluationTravailService
            .getByTrimestre({
                trimestre: this.trimestre.value,
                annee_id: this._anneeService.activeAnnee.id,
            })

            .subscribe(
                (data) => {
                    console.log(data)
                    this.dataSource.data = data;

                    this.data['actualiser2'] = false;
                },
                (err) => {
                    console.log(err);
                    this.dataSource.data = [];
                    this.data['actualiser2'] = false;
                }
            );
    }
    // detailStatistic

    detailStatistic(inscriptionEleve: InscriptionEleve): void {
        console.log(inscriptionEleve);
        this.dialogRef = this._matDialog.open(StatisticDetailComponent, {
            data: {
                statisticDataSearch: {
                    inscription_id: inscriptionEleve.inscription_id,
                    annee_id: inscriptionEleve.annee_id,
                },
            },
        });

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            }
            this._updateDataSource();
        });
    }
    actualiser() {
        
        this._updateDataSource();
    }
     
    

    telechargerStatistique(){
        if(!this.trimestre.value||this.trimestre.value.length==0)
        {
            this._snackBar.open('Veuillez choisir le trimestre', 'Splash', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration:2000
                });
                return;
        }
        this.data['btn3'] = true;
        this._evaluationTravailService.telechargerStatistique(
            {annee_id:this._anneeService.activeAnnee.id,trimestre:this.trimestre.value}).subscribe(data=>{

            saveAs(data,`STATISTIC${this._anneeService.activeAnnee.id}_${this.trimestre.value}.pdf`);


            this._snackBar.open('Téléchargement terminé', 'Splash', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration:2000
            });
            this.data['btn3'] = false;

        },err=>{
            
        this.data['btn3'] = false;
            console.log(err)
        })
    }
}
