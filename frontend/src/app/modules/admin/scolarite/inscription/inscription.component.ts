import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AnneeService } from 'app/core/services/annee.service';
import { ElevesService } from 'app/core/services/eleves.service';
import { InscriptionsService } from 'app/core/services/inscriptions.service';
import { ScolaritesService } from 'app/core/services/scolarites.service';
import { VersementsService } from 'app/core/services/versements.service';
import { Eleve } from 'app/models/eleve.model';
import { InscriptionEleve } from 'app/models/inscription-eleve.model';
import { Scolarite } from 'app/models/scolarite.model';
import { Versement } from 'app/models/versement.model';
import { SelectEleveComponent } from './select-eleve/select-eleve.component';
import * as moment from 'moment';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClasseService } from 'app/core/services/classe.service';
import { SalleClasseService } from 'app/core/services/salle-classe.service';
import { Classe } from 'app/models/classe.model';
import { SalleClasse } from 'app/models/salle-classe.model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
    eleveForm: FormGroup;
    inscriptionForm: FormGroup;
    versementForm: FormGroup;
    eleve: any = new InscriptionEleve({});
    matriculeAuto = false;
    inscription: InscriptionEleve = new InscriptionEleve({
        redoublant: 'NON',
        affecte: 'NON',
        etat_scolarite: 'ENCOURS',
    });
    scolarite: Scolarite = new Scolarite({
        frais_inscription: '',
        frais_scolarite: '',
        autres_frais: '',
    });

    formFieldHelpers: string[] = [''];

    classes: Classe[] = [];

    salleClasses: SalleClasse[] = [];
    salleClassesBk: SalleClasse[] = [];

    displayedColumns: string[] = ['id', 'montant', 'createdAt'];

    dataSource: MatTableDataSource<Versement> = new MatTableDataSource();

    dialogRef: any;
    versement: Versement = new Versement({});
    versementList: Versement[] = [];
    montant_restant: number = 0;
    constructor(
        private _formBuilder: FormBuilder,
        private eleveService: ElevesService,
        private _anneeService: AnneeService,
        private _matDialog: MatDialog,
        private inscriptionService: InscriptionsService,
        private _scolariteService: ScolaritesService,
        private _versementService: VersementsService,
        private _classeService: ClasseService,
        private _salleClasseService: SalleClasseService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.eleveForm = this.createEleveForm();
        this.inscriptionForm = this.createInscriptionForm();
        this.inscriptionForm.disable();
        this.versementForm = this.createVersementForm();
        this.versementForm.disable();
        this._classeService.getAll().subscribe((data) => {
            this.classes = data as Classe[];
        });
        this._salleClasseService
            .getSalleClasseByAnnee({
                annee_id: this._anneeService.activeAnnee.id,
            })
            .subscribe((data) => {
                this.salleClasses = data as SalleClasse[];
                this.salleClassesBk = data as SalleClasse[];
            });
    }

    filterSalleClasse(id) {
        this.salleClasses = this.salleClassesBk.filter(
            (d) => d.classe_id == id
        );
    }

    updateEleveForm(eleve: InscriptionEleve) {
        this.eleve = eleve;
        this.eleve.id = eleve.eid;
        this.inscription = eleve;
        console.log(this.eleve);
        this.inscriptionService
            .getInscriptionByEleveAndAnnee({
                annee_id: this._anneeService.activeAnnee.id,
                eleve_id: eleve.eleve_id,
            })
            .subscribe(
                (data) => {
                    this.inscriptionForm = this._formBuilder.group({
                        id: data.id,
                        annee_id: data.annee_id,
                        eleve_id: data.eleve_id,
                        classe_id: data.classe_id,
                        salle_classe_id: data.salle_classe_id,
                        etat_scolarite: data.etat_scolarite,
                        serie: data.serie,
                        redoublant: data.redoublant,
                        affecte: data.affecte,
                    });
                },
                (err) => {
                    this.inscriptionForm = this._formBuilder.group({
                        id: null,
                        annee_id: this._anneeService.activeAnnee.id,
                        eleve_id: eleve.eleve_id,
                        classe_id: null,
                        salle_classe_id: null,
                        serie: null,
                        redoublant: 'NON',
                        affecte: 'NON',
                        etat_scolarite: 'ENCOURS',
                    });
                }
            );
        // this.inscription.id = eleve.iid;

        this.eleveForm = this._formBuilder.group({
            id: eleve.eid,
            matricule: [
                { value: eleve.matricule, disabled: this.matriculeAuto },
            ],
            nom: eleve.nom,
            prenom: eleve.prenom,
            date_naissance: eleve.date_naissance,
            lieu_naissance: eleve.lieu_naissance ? eleve.lieu_naissance : '',
            n_extrait: eleve.n_extrait ? eleve.n_extrait : '',
            genre: eleve.genre,
            telephone: eleve.telephone ? eleve.telephone : '',
            nom_prenom_pere: eleve.nom_prenom_pere ? eleve.nom_prenom_pere : '',
            profession_pere: eleve.profession_pere ? eleve.profession_pere : '',
            nom_prenom_mere: eleve.nom_prenom_mere ? eleve.nom_prenom_mere : '',
            profession_mere: eleve.profession_mere ? eleve.profession_mere : '',
            nom_prenom_tel_pers_pre_besoin: eleve.nom_prenom_tel_pers_pre_besoin
                ? eleve.nom_prenom_tel_pers_pre_besoin
                : '',
        });
    }

    enregistrerInscription() {
        this.inscriptionForm.disable();
        let inscription = this.inscriptionForm.getRawValue();
        console.log(inscription);
        inscription['annee_id'] = this._anneeService.activeAnnee.id;
        this.inscriptionService.addOrUpdate(inscription).subscribe(
            (data) => {
                this.scolariteGetUpdate(inscription);
                this.inscriptionForm.enable();
                this.inscription.id = data.id;
                this.inscription.annee_id = data.annee_id;
                this.inscriptionForm.patchValue({
                    id: data.id,
                });
                console.log(this.inscriptionForm.getRawValue());
                this.versementGetUpdateList(inscription);
                this._snackBar.open('Mise à jour', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 2000,
                });
            },
            (err) => {
                this._snackBar.open(
                    'Impossible de faire la mise à jour',
                    'Splash',
                    {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000,
                    }
                );
            }
        );
    }

    createEleveForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.eleve.id],
            matricule: [
                { value: this.eleve.matricule, disabled: this.matriculeAuto },
            ],
            nom: [this.eleve.nom],
            prenom: [this.eleve.prenom],
            date_naissance: [this.eleve.date_naissance],
            lieu_naissance: [this.eleve.lieu_naissance],
            n_extrait: [this.eleve.n_extrait],
            genre: [this.eleve.genre],
            telephone: [this.eleve.telephone],
            nom_prenom_pere: [this.eleve.nom_prenom_pere],
            profession_pere: [this.eleve.profession_pere],
            nom_prenom_mere: [this.eleve.nom_prenom_mere],
            profession_mere: [this.eleve.profession_mere],
            nom_prenom_tel_pers_pre_besoin: [
                this.eleve.nom_prenom_tel_pers_pre_besoin,
            ],
        });
    }

    createVersementForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.versement.id],
            inscription_id: [this.versement.inscription_id],
            montant: [this.versement.montant],
            montantRestant: [{ value: null, disabled: true }],
            annee_id: [this.versement.annee_id],
            scolarite_id: [this.versement.scolarite_id],
        });
    }

    createInscriptionForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.inscription.id],
            annee_id: [this.inscription.annee_id],
            eleve_id: [this.inscription.eleve_id],
            classe_id: [this.inscription.classe_id],
            salle_classe_id: [this.inscription.salle_classe_id],
            etat_scolarite: [this.inscription.etat_scolarite],
            serie: [this.inscription.serie],
            redoublant: [this.inscription.redoublant],
            affecte: [this.inscription.affecte],
        });
    }

    enregistrerButton() {
        this.eleveForm.disable();
        this.eleveService
            .addOrUpdate(new Eleve(this.eleveForm.getRawValue()))
            .subscribe(
                (data) => {
                    this.reinitialiserEleve();
                },
                (err) => {
                    console.log(err);
                    this.eleveForm.enable();
                }
            );
    }

    choisirEleve(): void {
        this.dialogRef = this._matDialog.open(SelectEleveComponent, {
            panelClass: '',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }

            this.inscriptionForm.enable();
            this.versementForm.enable();
            this.updateEleveForm(response);
            this.scolariteGetUpdate({
                annee_id: this._anneeService.activeAnnee.id,
                classe_id: response.classe_id,
                serie: response.serie,
            });
            this.versementGetUpdateList({
                inscription_id: response.iid,
                annee_id: this._anneeService.activeAnnee.id,
            });
        });
    }

    scolariteGetUpdate(data) {
        this._scolariteService.getOneBy(data).subscribe(
            (data) => {
                console.log(data);
                if (data) this.scolarite = data as Scolarite;
                else {
                    this.scolarite = new Scolarite({
                        frais_inscription: '',
                        frais_scolarite: '',
                        autres_frais: '',
                    });
                }
            },
            (err) => {
                this.scolarite = new Scolarite({
                    frais_inscription: '',
                    frais_scolarite: '',
                    autres_frais: '',
                });
            }
        );
    }
    versementGetUpdateListUpdateHistorique() {
        this.versementGetUpdateList({
            inscription_id: this.inscription.id,
            annee_id: this.inscription.annee_id,
        });
    }

    reinitialiserEleve() {
        const lastLink = this.router.url;
        this.router.navigateByUrl('/signed-in-redirect').then(() => {
            this.router.navigate([lastLink]);
        });
    }

    versementGetUpdateList(data) {
        console.log(data);
        this._versementService.getAllBy(data).subscribe(
            (data) => {
                this.versementList = data as Versement[];
                this.dataSource.data = this.versementList;
                this.montantRestant(0);
            },
            (err) => {
                this.versementList = [];
                this.montantRestant(0);
            }
        );
    }

    verserButton() {
        this.versementForm.disable();
        let versement = this.versementForm.getRawValue();
        versement['inscription_id'] = this.inscription.id;
        versement['annee_id'] = this._anneeService.activeAnnee.id;
        versement['eleve_id'] = this.eleve.eid;
        this._versementService.addOrUpdate(versement).subscribe(
            (data) => {
                console.log(data);
                this.versementForm = this.createVersementForm();
                this.versementForm.enable();
            },
            (err) => {
                console.log(err);
                this.versementForm.enable();
            }
        );
    }
    montantRestant(montant: number) {
        let somme = 0;
        this.versementList.forEach((d) => {
            somme = somme + d.montant;
        });
        let frais_scolarite = Number(
            this.inscription.affecte == 'OUI'
                ? this.scolarite.frais_scolarite_affecte
                : this.scolarite.frais_scolarite
        );

        this.montant_restant =
            Number(this.scolarite.frais_inscription) +
            Number(frais_scolarite) -
            somme -
            Number(this.versementForm.getRawValue().montant);
        setTimeout(() => {
            if (this.montant_restant < 0) {
                this.montantRestant(0);
            }
        }, 2000);
    }

    public downloadInvoice() {
        // https://github.com/MaxwellADN/jspdf-invoice-template/blob/master/src/app/app.component.ts#L12
        const doc = new jsPDF('p', 'mm', 'a5');

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Reçu',
                        styles: {
                            halign: 'right',
                            fontSize: 20,
                        },
                    },
                ],
            ],
            theme: 'plain',
            styles: {},
        });
        var img = new Image();
        img.src = 'assets/images/logo/logo.png';
        doc.addImage(img, 'jpeg', 15, 5, 25, 25);

        autoTable(doc, {
            body: [
                [
                    {
                        content:
                            `Élève : #${this.eleve.matricule}` +
                            `\nNom et Prénom(s) : ${
                                this.eleve.nom + ' ' + this.eleve.prenom
                            }` +
                            `\nClasse : ${this.inscription.classe}` +
                            `\nDate : ${moment(
                                this.inscription.created_at
                            ).format('DD/MM/YYYY')}`,
                        styles: {
                            halign: 'left',
                            lineColor: '#0000000',
                            lineWidth: 0.1,
                        },
                    },
                    {
                        content:
                            `Référence : #${this.inscription.iid
                                .toString()
                                .padStart(6, '0')}` +
                            `\nDate : ${moment(new Date()).format(
                                'DD/MM/YYYY'
                            )}`,
                        styles: {
                            halign: 'right',
                            lineColor: '#0000000',
                            lineWidth: 0.1,
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Paiement de frais de scolarité',
                        styles: {
                            halign: 'left',
                            fontSize: 14,
                        },
                    },
                ],
            ],
            theme: 'plain',
        });
        let data = [];

        let somme = 0;
        for (let element of this.versementList) {
            somme = somme + element.montant;
            data.push([
                '#' + element.id.toString().padStart(6, '0'),
                'Frais inscription & Scolarité',
                moment(element.dateversement).format('DD/MM/YYYY'),
                element.montant,
            ]);
        }
        const restpaye =
            Number(this.scolarite.frais_inscription) +
            Number(
                this.inscription.affecte == 'OUI'
                    ? this.scolarite.frais_scolarite_affecte
                    : this.scolarite.frais_scolarite
            ) -
            somme;

        autoTable(doc, {
            head: [['Réf.', 'Description', 'Date', 'Montant']],
            body: data,
            theme: 'grid',
            headStyles: {
                fillColor: '#343a40',
            },
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Total payé:',
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                        },
                    },
                    {
                        content: `${somme} F. CFA`,
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                            fontStyle: 'bold',
                        },
                    },
                ],
                [
                    {
                        content: 'Reste à payé:',
                        styles: {
                            halign: 'right',
                            fontSize: 14,
                        },
                    },
                    {
                        content: `${restpaye} F. CFA`,
                        styles: {
                            fontSize: 14,
                            halign: 'right',
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Termes et remarques',
                        styles: {
                            halign: 'left',
                            fontSize: 14,
                        },
                    },
                ],
                [
                    {
                        content: 'Toute somme versée ne sera plus remboursable',
                        styles: {
                            halign: 'left',
                        },
                    },
                ],
            ],
            theme: 'plain',
        });

        return doc.save('invoice');
    }
}
