import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AnneeService } from 'app/core/services/annee.service';
import { ServiceAffectationService } from 'app/core/services/service-affectation.service';
import { ServiceAffectation } from 'app/models/service-affectation.model';
import { AddServiceAffectationComponent } from './add-service-affectation/add-service-affectation.component';

@Component({
  selector: 'app-service-affectation',
  templateUrl: './service-affectation.component.html',
  styleUrls: ['./service-affectation.component.scss']
})
export class ServiceAffectationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libelle','creation','actions'];
  dataSource = [];
  dialogRef: any; 
  @ViewChild(MatTable) table: MatTable<ServiceAffectation>;
  serviceAffectation:ServiceAffectation = new ServiceAffectation({});
  searchControl: FormControl = new FormControl();
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,private _anneeService:AnneeService,
    private _matDialog: MatDialog,private serviceAffectationService:ServiceAffectationService) { }
 

  ngOnInit(): void {
      this._updateDataSource();
  }

  _updateDataSource(){
    this.serviceAffectationService.getAlls().subscribe(data=>this.dataSource=data)
  }

 
  recherche(textRecherche) {
    textRecherche = textRecherche.trim(); // Remove whitespace
    textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = textRecherche;
}
    
  ajouter(): void
  {

      this.dialogRef = this._matDialog.open(AddServiceAffectationComponent, {
        data: {
          serviceAffectation: {},
            action: 'new',
        }});

      this.dialogRef.afterClosed()
          .subscribe((response: any) => {
              if ( !response )
              {
                  return;
              }
              this._updateDataSource();
          });
  }
  

    editer(serviceAffectation: ServiceAffectation): void {
      console.log(serviceAffectation)
      this.dialogRef = this._matDialog.open(AddServiceAffectationComponent, {
          data: {
              serviceAffectation: serviceAffectation,
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
 

    supprimer(serviceAffectation: ServiceAffectation) {
      this.dialogRef = this._fuseConfirmationService.open({
          title: 'Suppression de service affectation',
          message:
              'Voulez-vous supprimer le service affectation ' +
              serviceAffectation.libelle +' ?',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          console.log(response);
          if (response === 'confirmed') {
            //***DELETE ONE */
            this.serviceAffectationService.delete(serviceAffectation).subscribe(data=>{
                console.log(data);
              this._updateDataSource();
            },err=>{
                console.error(err)
            })
          }
      });
    }
}
