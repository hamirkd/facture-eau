import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonnelService } from 'app/core/services/personnel.service';
@Component({
    selector: 'app-personnel',
    templateUrl: './personnel.component.html',
    styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent implements OnInit,AfterViewInit {
     
    constructor(
        private _matDialog: MatDialog,private personnelService:PersonnelService
    ) {}

     
    ngAfterViewInit(){
        
      }
    recherche(textRecherche) {
       
    }

    ngOnInit(): void {  
    }  
  
}
