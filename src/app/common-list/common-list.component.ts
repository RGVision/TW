import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { DeleteComponent } from "../Add-on Components/delete/delete.component";
import { E_ActionType, E_SelectMode, E_datatype } from '../Enum/enum';
import { IActionDef, I_ColumnDef, IsHideButton, } from '../common-interface/common-interface';
@Component({
    selector: 'app-common-list',
    standalone: true,
    templateUrl: './common-list.component.html',
    styleUrl: './common-list.component.scss',
    imports: [CommonModule, NgxPaginationModule, FormsModule, DeleteComponent]
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

  Action_Delete(row:I_ColumnDef){
    Swal.fire({
      title: 'Are you sure to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        const index = this.gridData.indexOf(row);
        if (index !== -1) {
          this.gridData.splice(index, 1);
          localStorage.setItem('localdata', JSON.stringify(this.gridData));
          console.log('Single data deleted :', row);
        }
      }
    })
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

