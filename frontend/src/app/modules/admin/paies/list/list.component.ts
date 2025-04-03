import { ChangeDetectorRef, Component,ChangeDetectionStrategy,ViewEncapsulation, OnInit } from '@angular/core';
 import { ImportComponent as AddComponent } from '../import/import.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _DATA } from './data';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['code', 'sens','intitule', 'type', 'gain','imprimable'];
  dataSource = _DATA;
  dataSourceSalaries = [];
  displayedColumnsSalaries: string[] = ['code', 'nom','prenom'];
  displayedColumnsRubriques: string[] = ['code', 'intitule','sens'];
  dataSourceRubriques = [];

  choixView: {choixView:boolean} = {choixView:true};
  dialogRef: any;
  data:{salaries:{code,nom,prenom} [],rubriques:{code,intitule,sens} []} = {salaries:[],rubriques:[]}

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog, ) { }

  ngOnInit(): void {
  }
 

  importer(): void
  {
      this.dialogRef = this._matDialog.open(AddComponent,{
        data:this.data
      });

      this.dialogRef.afterClosed()
          .subscribe((response) => {
              if ( !response )
              {
                  return;
              }
              this.data.salaries = response.salaries;
              this.data.rubriques = response.rubriques;
              this.choixView.choixView = false; 
              setInterval(()=>{
                this.choixView.choixView = true;
              }, 250);
         });
  }

  add(): void
  {
      this.dialogRef = this._matDialog.open(AddComponent );

      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }

              // this._workFlowService.addWorkFlow(response.getRawValue());
          });
  }
   
}
