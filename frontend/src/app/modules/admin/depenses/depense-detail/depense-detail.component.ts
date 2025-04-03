import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { BulletinService } from 'app/core/services/bulletin.service'; 
import { VersementsService } from 'app/core/services/versements.service'; 
import { Versement } from 'app/models/versement.model';
 import { MediaAddComponent } from './media-add/media-add.component'; 
import { DepenseService } from 'app/core/services/depense.service';
import { MediaService } from 'app/core/services/media.service';
import { Media } from 'app/models/media.model';
import { Depense } from 'app/models/depense.model';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-depense-detail',
    templateUrl: './depense-detail.component.html',
    styleUrls: ['./depense-detail.component.scss'],
})
export class DepenseDetailComponent implements OnInit { 
    displayedColumns: string[] = [
        'type_documents', 
        'libelle_document', 
        'created_at',
        'actions',
    ];
    bulletinDataSearch: { annee_id; eleve_id; trimestre }; //{depense_id,annee_id}={}
    eleve: Depense = new Depense({});
    bulletin: any = {};
    data = {};
    depense_id
    dialogRef: any; 
    userAvatarForm = new FormControl('');

    dataSource: MatTableDataSource<{}> = new MatTableDataSource();
    dataSourceversement: MatTableDataSource<Versement> = new MatTableDataSource();
      
    depense : Depense = new Depense({})
    constructor( 
        route: ActivatedRoute,private _snackBar: MatSnackBar,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService, 
        private _depenseService:DepenseService,
        private _mediaService:MediaService
    ) {
        this.bulletinDataSearch;
        route.params.subscribe((d) => {
            this.depense_id = Number(d.depense_id); 
            this._depenseService.get(d.depense_id).subscribe(data=>{
                this.depense = data; 
            })
        });
    }

    ngOnInit(): void {
        this._updateDataSource();
    }
    _updateDataSource() {
        this._mediaService.getMediaByTypeAndId({type_documents:"DEPENSES",parent_id:this.depense_id}).subscribe(d=>{
        this.dataSource.data = d as Media[];
     
    });
   

    }
     
    
    
    addDocument(): void {
        this.dialogRef = this._matDialog.open(MediaAddComponent, {
            panelClass: '',
            data: {
                media: {type_documents:'DEPENSES',parent_id:this.depense.id}
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this.ngOnInit();
        });
    } 
     
    supprimer(element: Media) {
        this.dialogRef = this._fuseConfirmationService.open({
            title: 'Suppression de document',
            message:
                'Voulez-vous supprimer le document N ' + element.id + ' ?',
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'confirmed') {
                //***DELETE ONE */  
                this._mediaService.delete(element).subscribe(data=>{
                    console.log(data)
                  this._updateDataSource();
              });
            }
        });
    } 

    imprimer(element:Media){
        this.data['btno'+element.id] = true;
        this._mediaService.getDocument(element.id).subscribe(data=>{
            console.log(data)
            let ext = "";
            if(element.file_name.lastIndexOf('.')>=0)
            element.file_name.substring(element.file_name.lastIndexOf('.'));
            saveAs(data,element.libelle_document+ext); 
            this.data['btno'+element.id] = false;
            this._snackBar.open('Téléchargement terminé', 'Splash', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration:2000
            });
        },err=>{
            
            this.data['btno'+element.id] = false;
        })
    }
     

}
