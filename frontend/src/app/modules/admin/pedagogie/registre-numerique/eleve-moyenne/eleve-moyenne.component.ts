import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { BulletinMoyenneService } from 'app/core/services/bulletin-moyenne.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { MatiereService } from 'app/core/services/matiere.service';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { Matiere } from 'app/models/matiere.model';
import { BulletinEleveComponent } from '../bulletin-eleve/bulletin-eleve.component';
import { saveAs } from 'file-saver';
import { SubdivisionScolaire } from 'app/models/subdivision-scolaire.model';

@Component({
    selector: 'app-eleve-moyenne',
    templateUrl: './eleve-moyenne.component.html',
    styleUrls: ['./eleve-moyenne.component.scss']
})
export class EleveMoyenneComponent implements OnInit, AfterViewInit {

    @Input() salle_classe_id = 0;
    @Input() classe_id = 0;
    @Input() trimestre;
    @Input() parent;
    @Input() trimestreObjet: SubdivisionScolaire;
    @Input() meffort: 'MT' | 'MC';
    listeMatiere: Matiere[] = []
    actualiser: {} = {}
    dialogRef: any;
    typefichier: FormControl = new FormControl();

    constructor(private matiereService: MatiereService, private _snackBar: MatSnackBar,
        private _matDialog: MatDialog, private _annneeService: AnneeService, private _bulletinMoyenneService: BulletinMoyenneService
    ) { }

    searchControl: FormControl = new FormControl();

    eleves: InscriptionEleve[] = [];
    dataSource: MatTableDataSource<InscriptionEleve> = new MatTableDataSource();


    ngOnInit(): void {
        this.typefichier.setValue("pdf");
        this._updateDataSource();

        this.matiereService.getAllByAnneeAndSalle({annee_id:this._annneeService.activeAnnee.id,salle_classe_id: this.salle_classe_id}).subscribe(data => {
            this.listeMatiere = data;
            this.listeMatiere.sort((a,b)=>a.ordre-b.ordre)
            this.listeMatiere.forEach(matiere => {
                this.displayedColumns2.push(matiere.code)
            })
            this.displayedColumns3 = [];
            this.displayedColumns3.push(...this.displayedColumns)
            this.displayedColumns3.push(...this.displayedColumns2)
            this.displayedColumns3.push(...this.displayedColumns4)
        });

    }

    ngAfterViewInit() {
    }
    displayedColumns: string[] = [
        'id',
        'nomprenom'
    ];
    displayedColumns2: string[] = [];
    displayedColumns3: string[] = [];
    displayedColumns4: string[] = [
        'moyenne',
        // 'rang',
        'actions'
    ];

    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }

    retournerMatiereNote(bulletinMatieres: any[], matiere_id) {
        if (!bulletinMatieres) return null;
        let data = bulletinMatieres.find(p => p.matiere_id == matiere_id);
        if (!data) return null;
        if (this.meffort == 'MT') return data.moyenne_travail;
        return data.moyenne_compo
    }
    _updateDataSource() {
        this._bulletinMoyenneService.getAllBulletinMoyenneSalleClasseAnneeTrimestreForAllMatiere(
            {
                annee_id: this._annneeService.activeAnnee.id,
                salle_classe_id: this.salle_classe_id,
                trimestre: this.trimestre
            }).subscribe(data => {
                data.sort((a, b) => {
                    return a['eleve']['nom'] + a['eleve']['prenom'] > b['eleve']['nom'] + b['eleve']['prenom'] ? 1 : -1
                })
                this.dataSource.data = data;

                this.parent.btnRefresh = true;

            },err=>{
                this.parent.btnRefresh = true;
            })
    }


    calculerMoyenne() {
        if (!this.trimestreObjet.ecriture) {
            this._snackBar.open('Vous ne pouvez pas recalculer les moyennes pour cette classe car le trimestre est cloturé', 'Splash', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5000
            });
            return;
        }
        this.actualiser['btn1'] = true;
        this._bulletinMoyenneService.recalculeDesMoyennesEcompletudeBulletin(
            {
                annee_id: this._annneeService.activeAnnee.id,
                salle_classe_id: this.salle_classe_id,
                trimestre: this.trimestre
            }).subscribe(data => {
                console.log(data);
                this.actualiser['btn1'] = false;
                this._snackBar.open('Le recalcule est terminé', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._updateDataSource();

            }, err => {

                this.actualiser['btn1'] = false;
                console.log(err)
            })
    }

    detail(inscriptionEleve: InscriptionEleve): void {
        this.dialogRef = this._matDialog.open(BulletinEleveComponent, {
            data: {
                bulletinDataSearch: {
                    eleve_id: inscriptionEleve.eleve_id, annee_id: inscriptionEleve.annee_id,
                    trimestre: this.trimestre, salle_classe_id: this.salle_classe_id
                },
                trimestreObjet:this.trimestreObjet,
                listeMatiere:this.listeMatiere
            },
            panelClass: "w-full"
        });

        this.dialogRef.afterClosed().subscribe((response: any) => {
            if (!response) {
                return;
            }
            this._updateDataSource();
        });
    }
    telechargerBulletin() {

        this.actualiser['btn2'] = true;
        this._bulletinMoyenneService.telechargerBulletin(
            {
                annee_id: this._annneeService.activeAnnee.id,
                salle_classe_id: this.salle_classe_id,
                trimestre: this.trimestre
            }).subscribe(data => {

                saveAs(data, `BULLETIN_${this._annneeService.activeAnnee.id}${this.trimestre}${this.salle_classe_id}.pdf`);


                this.actualiser['btn2'] = false;
                this._snackBar.open('Téléchargement terminé', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._updateDataSource();

            }, err => {

                this.actualiser['btn2'] = false;
                console.log(err)
            })
    }

    telechargerBulletinDeliberation() {

        this.actualiser['btn3'] = true;
        this._bulletinMoyenneService.telechargerDeliberation(
            {
                annee_id: this._annneeService.activeAnnee.id,
                salle_classe_id: this.salle_classe_id,
                trimestre: this.trimestre, typefichier: this.typefichier.value
            }).subscribe(data => {

                saveAs(data, `BULLETIN_DELIBERATION_${this._annneeService.activeAnnee.id}${this.trimestre}${this.salle_classe_id}.${this.typefichier.value}`);


                this.actualiser['btn3'] = false;
                this._snackBar.open('Téléchargement terminé', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._updateDataSource();

            }, err => {

                this.actualiser['btn3'] = false;
                console.log(err)
            })
    }
}
