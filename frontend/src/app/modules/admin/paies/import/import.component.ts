import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { isNumber } from 'lodash';
import { distinct } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
    action = 'noshow';
    dataImport;
    data: {
        salaries: { code; nom; prenom }[];
        rubriques: { code; intitule; sens }[];
    } = { salaries: [], rubriques: [] };

    arrayBuffer: any;
    file: File;
    formFieldHelpers: string[] = [''];

    constructor(
        private _formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef<ImportComponent>
    ) {
        this.dataImport = {};
    }

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */

    ngOnInit(): void {}

    onSubmit() {}

    close() {
        this.matDialogRef.close(this.data);
    }

    incomingfile(event) {
        this.file = event.target.files[0];
    }

    Upload1() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
                
            var bstr = arr.join('');
            bstr = 'ordre;nom;prenom;code;intitule;sens\n'+bstr
            console.log(bstr)
            var workbook1:XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            
            var first_sheet_name = workbook1.SheetNames[0];
            var worksheet1 = workbook1.Sheets[first_sheet_name];
            let worksheet = worksheet1;




            // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            let dataAll = XLSX.utils.sheet_to_eth(worksheet);
            console.log(dataAll)
        };
        fileReader.readAsArrayBuffer(this.file);
    }
    Upload() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join('');
            
            bstr = 'ordre;nom;prenom;code;intitule;sens\n'+bstr; /** Ajout d'une ligne pour permettre de nommer les colonnes du tableau */
            var workbook = XLSX.read(bstr, { type: 'binary' });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            let dataAll = XLSX.utils.sheet_to_json(worksheet, {
                raw: true,
            }) as { ordre; nom; prenom; code; intitule; sens }[];

            let salariesIndex = Array.from(
                new Set(dataAll.map((x) => x.ordre))
            );
            let rubriquesIndex = Array.from(
                new Set(dataAll.map((x) => x.code))
            );
            // let salaries = dataAll.map(a=>a.code)
            this.data.salaries = [];

            salariesIndex.forEach((i) => {
                if (!isNumber(i)) return;
                let da = dataAll.find((p) => p.ordre == i);
                this.data.salaries.push({
                    nom: da.nom,
                    code: da.ordre,
                    prenom: da.prenom,
                });
            });
            this.data.rubriques = [];
            rubriquesIndex.forEach((i) => {
                if (!isNumber(i)) return;
                let da = dataAll.find((p) => p.code == i);
                this.data.rubriques.push({
                    code: da.code,
                    intitule: da.intitule,
                    sens: da.sens > 0 ? '+' : '-',
                });
            });
            this.close();
        };
        fileReader.readAsArrayBuffer(this.file);
    }
}
