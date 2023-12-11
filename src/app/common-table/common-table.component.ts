import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { DateComponent } from "../Add-on Components/date/date.component";
import { DeleteComponent } from "../Add-on Components/delete/delete.component";
import { IActionDef, I_ColumnDef, IsHideButton } from '../Column-Def/IColumnDef';
import { E_ActionType, E_SelectMode, E_datatype } from '../Enum/enum';
import { AppService } from '../app.service';
import { BulkViewComponent } from "../bulk-view/bulk-view.component";
@Component({
    selector: 'app-common-table',
    standalone: true,
    templateUrl: './common-table.component.html',
    styleUrl: './common-table.component.css',
    imports: [CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, BulkViewComponent, DeleteComponent, DateComponent]
})
export class CommonTableComponent {

  data: FormGroup;
  datas: I_ColumnDef[] = [];



  
  constructor(private appService: AppService) {
   
    this.datas = [];
    this.data = new FormGroup({
      Field: new FormControl(''),
    });
    
   }


  ngOnInit(): void {
    if(this.gridData.length > 0){
      this.tempGridData = this.gridData;
    }
    const localdatas = this.data.value;
    this.appService.saveGridData(localdatas);
   this.data.reset();
    
  }


  datatype:E_datatype = E_datatype.table;
  selectMode: E_SelectMode = E_SelectMode.Multi;
  @Input() gridActionList: IActionDef[] = [];
  @Input() Create: E_ActionType = 1;
  @Input() Edit: E_ActionType = 2;
  @Input() Delete: E_ActionType = 3;
  @Input() grid: number | string = 1;
  @Input() columnDefs:I_ColumnDef[] = [];
  @Input()  gridData:any[]=[];
  @Input() IsHidden: IsHideButton = {Delete:false,Edit:false,Create:false,All:false};
  @Output() getGridCheckedData = new EventEmitter<{ gridData: any }>();
  tempGridData:any[]=[];
  GridFilter: any = {};
  isCreate = true;
  isDelete = true;
  isEdit = true;
  GridCheckedData: any[] = [];
  GridCheckAll: boolean = false;
  isFilter =false;
  isBulkEdit=false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;
  @Input()datepicker: any ;
  selectedDateFormat!: string;
  
  getsorting(headers:any){ debugger
    console.log("before",this.gridData)
  this.gridData = this.gridData.sort((a, b) => { debugger
  if (a[headers.Field] < b[headers.Field]) return 1;
  else if (a[headers.Field] > b[headers.Field]) return -1;
  else return 0;
});

console.log("after",this.gridData)

  }


  page :any;
  pagechange(data:any){ debugger
    this.page = data;
  }

  getsearchfilter($event:any) { debugger
    this.tempFiltergridData =  this.tempGridData;
    for (let key in this.GridFilter) {
      this.tempFiltergridData = this.tempFiltergridData.filter((x) => {
        if (x[key] && (x[key]).toString().toLowerCase().indexOf((this.GridFilter[key].trim()).toLowerCase()) > -1) {
          return x;
        }
      });
    }
    this.gridData = this.tempFiltergridData;

    }
toggleFilter(){
  this.isFilter = !this.isFilter;
  if(this.isFilter) {
    this.buttonName = 'Close Filter'
    console.log(this.isFilter)
    // this.isBulkEdit=false
    }
    else {
    this.buttonName = 'Open Filter'
    }
}
// Action_Create($event:any){
//   console.log('Create')
// }
// Action_Edit($event:any){
//   console.log('Edit')
// }

// Action_Delete($event:any){
//       console.log('delete')
// }
  

// removeCreateEdit(){
//   this.IsHidden.Create=true;
//   this.IsHidden.Edit=true;
// };

getGridCheckAll(event: any) { debugger

  let GridCheckedData: any[] = [];
  let AllowSelect:boolean = true;

  if (event.target.checked) {
    GridCheckedData = this.gridData;
     this.GridCheckedData = [];
    for (let index = 0; index < this.gridData.length; index++) {
      let CurrentRow = this.gridData[index];
      CurrentRow.AllowSelect = true;
      if (!CurrentRow.AllowSelect) {
        AllowSelect = false;
        GridCheckedData = [];
        setTimeout(() => {
          this.GridCheckAll = false;
        }, 1);
        break;
      }
      else { debugger
        //CurrentRow.isGridSelect = true;
        this.GridCheckedData.push(CurrentRow)
      }
    }
  }
  else {
    GridCheckedData = [];
    AllowSelect = false;
  }

  setTimeout(() => { debugger
    this.GridCheckedData = GridCheckedData;
    this.insertSelectField(AllowSelect);
    this._getGridCheckedData();
  }, 1);

}
_getGridCheckedData() { debugger
  this.getGridCheckedData.emit({ gridData: this.GridCheckedData });
}
insertSelectField(value: boolean) { debugger
  this.gridData = this.gridData.map((x) => {
    x.isGridSelect = value;
    return x;
  });
}

getCheckboxCheckedRules(event: any, index:number, CurrentRow?: any) { debugger

  if (CurrentRow.isGridSelect) {
    CurrentRow.AllowSelect = true;
    setTimeout(() => {
      this.gridData[index].isGridSelect = CurrentRow.AllowSelect;
      this.getCheckboxChecked(event,index);
    }, 10);
  }

  this.getCheckboxChecked(event,index);
}

getCheckboxChecked(event?: any, index?: number) { debugger
  this.GridCheckedData = [];
  for (var i = 0; i < this.gridData.length; i++) {
    if (this.gridData[i].isGridSelect)
      this.GridCheckedData.push(this.gridData[i]);
  }
  if (this.GridCheckedData.length == this.gridData.length)
    this.GridCheckAll = true;
  else this.GridCheckAll = false;

  this._getGridCheckedData();
}

BulkEdit() {debugger
  
  this.isBulkEdit = !this.isBulkEdit;
  }

  deleteAdata(row:I_ColumnDef) {debugger
    
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

  onDateSelected(format: string) {
    this.selectedDateFormat = format;
}
}
