import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { I_ColumnDef } from '../Column-Def/IColumnDef';
import { E_datatype } from '../Enum/enum';
import { CommonTableComponent } from "../common-table/common-table.component";
import { CommongridData } from '../grid-data/grid-data';

@Component({
    selector: 'app-listofpages',
    standalone: true,
    templateUrl: './listofpages.component.html',
    styleUrl: './listofpages.component.css',
    imports: [CommonModule, CommonTableComponent]
})
export class ListofpagesComponent {

  DataTypes = E_datatype;
  @Input() datatype:E_datatype=E_datatype.table;
  @Input() gridData = CommongridData;
  @Input() columnDefs:I_ColumnDef[]=[
    {Field:"EntityTypeId",Name:"EntityType Id"},
    {Field:"CaseId",Name:"Case Id"},
    {Field:"AgentName",Name:"Agent Name"},
  ];
  @Input() columnDefs2:I_ColumnDef[]=[
    {Field:"Country",Name:"Country"},
    {Field:"ContactPerson",Name:"Contact Person"},
    {Field:"ContactMobileNumber",Name:"Contact Mobile Number"},
    {Field:"CreatedDatetime",Name:"CreatedDatetime", DataType:"Date" }
  ];

  changelist() {
    this.datatype = this.DataTypes.list;
    }
    changetable() {
    this.datatype = this.DataTypes.table;
    }
    changecard(){
      this.datatype = this.DataTypes.card;
    }
}
