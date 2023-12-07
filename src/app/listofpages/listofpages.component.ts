import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { I_ColumnDef } from '../Column-Def/IColumnDef';
import { E_datatype } from '../Enum/enum';
import { BootstrapComponent } from "../bootstrap/bootstrap.component";
import { BulkViewComponent } from "../bulk-view/bulk-view.component";
import { CommonCardComponent } from "../common-card/common-card.component";
import { CommonListComponent } from "../common-list/common-list.component";
import { CommonTableComponent } from "../common-table/common-table.component";
import { CommongridData } from '../grid-data/grid-data';
@Component({
    selector: 'app-listofpages',
    standalone: true,
    templateUrl: './listofpages.component.html',
    styleUrl: './listofpages.component.css',
    imports: [CommonModule, CommonTableComponent, CommonListComponent, CommonCardComponent, BootstrapComponent, BulkViewComponent]
})

export class ListofpagesComponent {

  DataTypes = E_datatype;
  datatype:E_datatype=E_datatype.table;
  @Input() gridData = CommongridData;
  @Input() columnDefs:I_ColumnDef[]=[
    {Field:"EntityTypeId",Name:"EntityType Id"},
    {Field:"CaseId",Name:"Case Id"},
    {Field:"AgentName",Name:"Agent Name"},
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
    changebootstrap() {
      this.datatype =  this.DataTypes.bootstrap;
      }
    
}
