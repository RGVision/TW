import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { I_ColumnDef, IsHideButton } from '../Column-Def/IColumnDef';
import { E_datatype } from '../Enum/enum';
@Component({
  selector: 'app-bootstrap',
  standalone: true,
  imports: [CommonModule , FormsModule,NgxPaginationModule],
  templateUrl: './bootstrap.component.html',
  styleUrl: './bootstrap.component.css'
})
export class BootstrapComponent {
  ngOnInit(): void {
    if(this.gridData.length > 0){
      this.tempGridData = this.gridData;
    }
  }


  datatype:E_datatype = E_datatype.table;

  @Input() grid: number | string = 1;
  @Input() columnDefs:I_ColumnDef[] = [];
  @Input()  gridData:any[]=[];
  @Input() IsHidden: IsHideButton = {Delete:false,Edit:false,Create:false,All:false};
  @Output() getGridCheckedData = new EventEmitter<{ gridData: any }>();
  tempGridData:any[]=[];
  GridFilter: any = {};
  isFilter =false;
  isCreate = true;
  isDelete = true;
  isEdit = true;
  GridCheckedData: any[] = [];
  GridCheckAll: boolean = false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;

  getsorting(headers:any){ debugger
    
  this.gridData = this.gridData.sort((a, b) => { debugger
  if (a[headers.Field] < b[headers.Field]) return 1;
  else if (a[headers.Field] > b[headers.Field]) return -1;
  else return 0;
});



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
    }
    else {
    this.buttonName = 'Open Filter'
    }
}
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
Action_Create($event:any){
  console.log('Create')
}
Action_Edit($event:any){
  console.log('Edit')
}
Action_Delete($event:any){
  console.log('Delete')
}
}
