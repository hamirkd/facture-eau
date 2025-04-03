import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonnelService } from 'app/core/services/personnel.service';
import { Personnel } from 'app/models/personnel.model';
import { AddPersonnelComponent } from '../add-personnel/add-personnel.component';
import { TranslateService } from '@ngx-translate/core';

import * as FileSaver from 'file-saver';
@Component({
    selector: 'app-list-personnel',
    templateUrl: './list-personnel.component.html',
    styleUrls: ['./list-personnel.component.scss'],
})
export class ListPersonnelComponent implements OnInit,AfterViewInit {
    
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
    constructor(
        private _matDialog: MatDialog,private personnelService:PersonnelService,
        private translateService: TranslateService
    ) {}

    searchControl: FormControl = new FormControl();

    dialogRef: any;
    dataSource: MatTableDataSource<Personnel> = new MatTableDataSource();
    pageSize = 20;

    displayedColumns: string[] = [
        'id',
        'matricule',
        'nom',
        'prenom',
        'genre',
        'typepersonnel',
        'niveauetude',
        'telephone',
        'email',
        'actions',
    ];
    displayedColumnsA: string[] = [
        'id',
        'matricule',
        'nom',
        'prenom',
        'genre',
        'typepersonnel',
        'niveauetude',
        'telephone',
        'email',
    ];

    ngAfterViewInit(){
        if(localStorage.getItem("PersonnelpageSize")){
            this.pageSize = JSON.parse(localStorage.getItem("PersonnelpageSize"))
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    recherche(textRecherche) {
        textRecherche = textRecherche.trim(); // Remove whitespace
        textRecherche = textRecherche.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = textRecherche;
    }

    ngOnInit(): void { 
        this._updateDataSource();
    }

    ajouter(): void
    {
        this.dialogRef = this._matDialog.open(AddPersonnelComponent, {
            panelClass: 'w-full',
            data      : {
                personnel:{},
                action: 'new'
            } 
        });
  
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                
                this._updateDataSource();
            });
    }
    
    _updateDataSource(){
        this.personnelService.getAlls().subscribe(data=>{
            this.dataSource.data = data as Personnel[];
        })
    }

    editer(element){
      this.dialogRef = this._matDialog.open(AddPersonnelComponent, {
        panelClass: 'w-full',
        data      : {
            personnel:new Personnel(element),
            action: 'update'
        } 
    });

    this.dialogRef.afterClosed()
        .subscribe((response: FormGroup) => {
            if ( !response )
            {
                return;
            }
            
            this._updateDataSource();
        });
    }
    
    exporter(){
        if(!this.dataSource.data||this.dataSource.data.length==0){
        
        return;
        }
  
       // var blob = new Blob([this.convertToCSV(this.dataSource.data)], {type: "text/csv;charset=iso-8859-1"});
        var blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), new TextEncoder().encode(this.convertToCSV(this.dataSource.data))], { type: "text/csv;charset=iso-8859-1" });

        FileSaver.saveAs(blob, "Liste du personnel" +".csv");
      }
      convertToCSV(arr) {
        arr.forEach(item=>{
            Object.keys(arr[0]).forEach(champ => {
                item[champ]=item[champ]?item[champ].toString().trim():item[champ]
              });
          })
          const array = [Object.keys(arr[0])].concat(arr)
          return array.map(it => {
              return Object.values(it).join(';').toString()
          }).join('\n')
      }
    supprimer(element){}
    handlePageEvent(e: PageEvent) {
        // this.pageEvent = e;
        // this.length = e.length;
        this.pageSize = e.pageSize;
        localStorage.setItem("PersonnelpageSize",JSON.stringify(e.pageSize));
        // this.pageIndex = e.pageIndex;
      }
}
