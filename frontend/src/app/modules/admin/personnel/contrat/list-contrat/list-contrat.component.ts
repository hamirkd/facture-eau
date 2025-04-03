import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContratService } from 'app/core/services/contrat.service';
import { Contrat } from 'app/models/contrat.model';
import { AddContratComponent } from '../add-contrat/add-contrat.component';

@Component({
    selector: 'app-list-contrat',
    templateUrl: './list-contrat.component.html',
    styleUrls: ['./list-contrat.component.scss'],
})
export class ListContratComponent implements OnInit,AfterViewInit {
    
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
    constructor(
        private _matDialog: MatDialog,private contratService:ContratService
    ) {}

    searchControl: FormControl = new FormControl();

    dialogRef: any;
    dataSource: MatTableDataSource<Contrat> = new MatTableDataSource();
    pageSize = 20;

    displayedColumns: string[] = [
        'id',
        'numero',
        'personne',
        'objet',
        'typecontrat',
        'datesignature',
        'datedebut',
        'datefin',
        'actions',
    ];

    ngAfterViewInit(){
        if(localStorage.getItem("ContratpageSize")){
            this.pageSize = JSON.parse(localStorage.getItem("ContratpageSize"))
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
        this.dialogRef = this._matDialog.open(AddContratComponent, {
            panelClass: '',
            data      : {
                contrat:{},
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
        this.contratService.getAlls().subscribe(data=>{
            this.dataSource.data = data as Contrat[];
            this.dataSource.data.forEach(contrat=>{
                contrat['nomprenom'] = contrat?.personnel?.nom +" "+contrat?.personnel?.prenom
            })
        })
    }

    editer(element){
      this.dialogRef = this._matDialog.open(AddContratComponent, {
        panelClass: '',
        data      : {
            contrat:new Contrat(element),
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
    supprimer(element){}
    handlePageEvent(e: PageEvent) {
        // this.pageEvent = e;
        // this.length = e.length;
        this.pageSize = e.pageSize;
        localStorage.setItem("ContratpageSize",JSON.stringify(e.pageSize));
        // this.pageIndex = e.pageIndex;
      }
}
