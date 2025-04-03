import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContratService } from 'app/core/services/contrat.service';
import { PersonnelService } from 'app/core/services/personnel.service';
import { PosteService } from 'app/core/services/poste.service';
import { ServiceAffectationService } from 'app/core/services/service-affectation.service';
import { Contrat } from 'app/models/contrat.model';
import { Personnel } from 'app/models/personnel.model';
import { Poste } from 'app/models/poste.model';
import { ServiceAffectation } from 'app/models/service-affectation.model';

@Component({
    selector: 'app-add-contrat',
    templateUrl: './add-contrat.component.html',
    styleUrls: ['./add-contrat.component.scss'],
})
export class AddContratComponent implements OnInit {
    @Input() name;

    contrat: Contrat;
    action: 'edit' | 'new' = 'new';
    listePersonnel: Personnel[] = [];
    listeServiceAffectation: ServiceAffectation[] = [];
    listePoste: Poste[] = [];
    readonlyPersonnelId = false;

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddContratComponent>, private _snackBar: MatSnackBar,
        public _contratService: ContratService,
        private _personnelService: PersonnelService,
        private _serviceAffectationService: ServiceAffectationService,
        private _posteService: PosteService
    ) {
        this.contrat = new Contrat(_data.contrat);
        this.action = _data.action;
        this.readonlyPersonnelId = this.contrat.personnel_id != null;
        this.contratForm = this.createContratForm();
    }
    contratForm: any;

    ngOnInit(): void {

        this._personnelService.getAlls().subscribe(data => {
            this.listePersonnel = data as Personnel[];
        }, err => this.listePersonnel = []);
        this._posteService.getAlls().subscribe(data => {
            this.listePoste = data as Poste[];
        }, err => this.listePoste = []);
        this._serviceAffectationService.getAlls().subscribe(data => {
            this.listeServiceAffectation = data as ServiceAffectation[];
        }, err => this.listeServiceAffectation = []);
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createContratForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contrat.id],
            personnel_id: [this.contrat.personnel_id],
            poste_id: [this.contrat.poste_id],
            numerocontrat: [this.contrat.numerocontrat],
            objetcontrat: [this.contrat.objetcontrat],
            datesignature: [ this.contrat.datesignature],
            datedebut: [this.contrat.datedebut],
            datefin: [this.contrat.datefin],
            cnss: [this.contrat.cnss],
            salaire: [this.contrat.salaire],
            duree: [this.contrat.duree],
            niveaurecrutement: [this.contrat.niveaurecrutement],
            projet: [this.contrat.projet],
            serviceaffection_id: [this.contrat.serviceaffection_id],
            typecontrat: [this.contrat.typecontrat],
            nomprenompersonneaprevenir: [this.contrat.nomprenompersonneaprevenir]
        });
    }

    onSubmit() {
        let contrat = new Contrat(this.contratForm.getRawValue());

        if (this.action == 'new') {
            this._contratService.add(contrat).subscribe(
                (data) => {

                    this._snackBar.open('Vos données ont été sauvegardées', 'Splash', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this.matDialogRef.close(this.contratForm);
                },
                (err) => {
                    console.log(err);
                    this._snackBar.open('Une erreur intervenue', 'Splash', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000
                    });
                }
            );
        } else {
            console.log(contrat);
            this._contratService
                .update(contrat)
                .subscribe((data) => {
                    this._snackBar.open('Vos données ont été sauvegardées', 'Splash', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this.matDialogRef.close(this.contratForm);
                }, err => {

                    this._snackBar.open('Une erreur intervenue', 'Splash', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
        }
    }
}
