import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SalarieService } from 'app/core/services/salarie.service';
import { Salarie } from 'app/models/salarie.model';
import { AddComponent } from '../add/add.component';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
    _d = { isEdit: false };
    dialogRef: any;
    constructor(
        private _matDialog: MatDialog,
        private salarieService: SalarieService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params) => {
            console.log(params);
            if (params['id']) {
                this.salarieService.get(params['id']).subscribe((data) => {
                    this.data = data;
                });
            }
        });
    }
    data: Salarie = new Salarie({});

    ngOnInit(): void {}

    edit() {
        this.dialogRef = this._matDialog.open(AddComponent, {
            data: {
                salarie: this.data,
                action: 'edit',
            },
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            const s = new Salarie(this.data);
            s.copy(response.getRawValue());
            // this.salarieService.update(s).subscribe(data=>{
            //   console.log(data);
            // })
        });
    } 
}
