import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonnelService } from 'app/core/services/personnel.service';
import { PosteService } from 'app/core/services/poste.service';
import { Personnel } from 'app/models/personnel.model';
import { Poste } from 'app/models/poste.model';

@Component({
    selector: 'app-add-personnel',
    templateUrl: './add-personnel.component.html',
    styleUrls: ['./add-personnel.component.scss'],
})
export class AddPersonnelComponent implements OnInit {
    @Input() name;

    personnel: Personnel;
    action: 'edit' | 'new' = 'new';

    listePoste: Poste[] = [];
    formFieldHelpers: string[] = [''];
    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public matDialogRef: MatDialogRef<AddPersonnelComponent>,private _snackBar: MatSnackBar,
        public personnelService: PersonnelService,
        private _posteService: PosteService
    ) {
        this.personnel = new Personnel(_data.personnel);
        this.action = _data.action;
        this.personnelForm = this.createPersonnelForm();
    }
    personnelForm: any;

    ngOnInit(): void {
      
        this._posteService.getAlls().subscribe(data => {
            this.listePoste = data as Poste[];
        }, err => this.listePoste = []);
    }
    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    createPersonnelForm(): FormGroup {
        return this._formBuilder.group({
        id:[this.personnel.id],
        nom:[this.personnel.nom],
        prenom:[this.personnel.prenom],
        datenais:[this.personnel.datenais],
        genre:[this.personnel.genre],
        telephone:[this.personnel.telephone],
        email:[this.personnel.email],
        observation:[this.personnel.observation],
        typepersonnel:[this.personnel.typepersonnel],
        niveauetude:[this.personnel.niveauetude],
        lieunais:[this.personnel.lieunais],
        matrimoniale:[this.personnel.matrimoniale],
        nationnalite:[this.personnel.nationnalite],
        position:[this.personnel.position],
        specialite:[this.personnel.specialite],
        domaine_discipline:[this.personnel.domaine_discipline],
        poste_id:[this.personnel.poste_id],
        matricule:[this.personnel.matricule],
        salaire_brute:[this.personnel.salaire_brute],
        date_premiere_prise_service:[this.personnel.date_premiere_prise_service],
        });
    }

    onSubmit() {
        let personnel = new Personnel(this.personnelForm.getRawValue());
       
        if (this.action == 'new') {
            this.personnelService.add(personnel).subscribe(
                (data) => {
                    
                this._snackBar.open('Vos données ont été sauvegardées', 'Splash', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration:2000
                });
                    this.matDialogRef.close(this.personnelForm);
                },
                (err) => {
                    console.log(err);
                    this._snackBar.open('Une erreur intervenue', 'Splash', {
                      horizontalPosition: 'right',
                      verticalPosition: 'top',
                      duration:2000
                    });
                }
            );
        } else {
            console.log(personnel);
            this.personnelService
                .update(personnel)
                .subscribe((data) => {
                    this._snackBar.open('Vos données ont été sauvegardées', 'Splash', {
                      horizontalPosition: 'right',
                      verticalPosition: 'top',
                      duration:2000
                    });
                    this.matDialogRef.close(this.personnelForm);
                },err=>{
                    
      this._snackBar.open('Une erreur intervenue', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:2000
      });
                });
        }
    }
}
