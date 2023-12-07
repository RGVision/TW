import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IActionDef, I_ColumnDef, IsHideButton, } from '../Column-Def/IColumnDef';
import { E_ActionType, E_SelectMode, E_datatype } from '../Enum/enum';
@Component({
  selector: 'app-common-list',
  standalone: true,
  imports: [CommonModule ,NgxPaginationModule , FormsModule],
  templateUrl: './common-list.component.html',
  styleUrl: './common-list.component.scss'
})
export class CommonListComponent implements OnInit{

  ngOnInit(): void {
    if(this.gridData.length > 0){
      this.tempGridData = this.gridData;
    }
  }


datatype:E_datatype = E_datatype.list;
//  switchVar='A';
//  changeswitch():void{
//    this.switchVar='C';
//  }
 selectMode: E_SelectMode = E_SelectMode.Multi;
  @Input() gridActionList: IActionDef[] = [];
  @Input() Create: E_ActionType = 1;
  @Input() Edit: E_ActionType = 2;
  @Input() Delete: E_ActionType = 3;
  @Input() list: any;
  @Input() columnDefs:I_ColumnDef[] = [];
  @Input()  gridData:any[]=[];
  @Input() IsHidden: IsHideButton = {Delete:true,Edit:false,Create:false,All:false};
  tempGridData:any[]=[];
  GridFilter: any = {};
  isFilter =false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;
  isCreate = true;
  isDelete = true;

  page :any;
  pagechange(data:any){ debugger
    this.page = data;
  }
  Action_Create($event:any){
    this.isCreate = this.IsHidden.Create;
    console.log('Create')
  }

  Action_Delete($event:any){
    this.isDelete = this.IsHidden.Delete;
    console.log('Delete')
  }
  removeCreateDelete(){
    this.IsHidden.Create=true;
    this.IsHidden.Delete=false;
  };
toggleFilter(){
  this.isFilter = !this.isFilter;
  if(this.isFilter) {
    this.buttonName = 'Close Filter'
    console.log(this.isFilter)
    }
    else {
    this.buttonName = 'Open Filter'
    }
}



}

