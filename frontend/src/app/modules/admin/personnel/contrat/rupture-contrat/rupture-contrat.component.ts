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
    selector: 'app-rupture-contrat',
    templateUrl: './rupture-contrat.component.html',
    styleUrls: ['./rupture-contrat.component.scss'],
})
export class RuptureContratComponent implements OnInit {
    @Input() name;

    contrat: Contrat;
    action: 'edit' | 'new' = 'new';  

    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<RuptureContratComponent>, private _snackBar: MatSnackBar,
        public _contratService: ContratService 
    ) {
        this.contrat = new Contrat(_data.contrat); 
        this.contratForm = this.createContratForm();
    }
    contratForm: any;

    ngOnInit(): void {
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createContratForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contrat.id],
            nomprenom: [this.contrat.personnel.nom+" "+this.contrat.personnel.prenom],
            numerocontrat: [this.contrat.numerocontrat],
            droitcontractuel: [this.contrat.droitcontractuel],
            avisdirection: [this.contrat.avisdirection],
            datedemanderupture: [this.contrat.datedemanderupture],
            daterupture: [this.contrat.daterupture],
            motifrupture: [this.contrat.motifrupture],
            delaispreavis: [this.contrat.delaispreavis]
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
