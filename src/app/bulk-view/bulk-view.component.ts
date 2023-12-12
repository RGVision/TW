import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { DateComponent } from "../Add-on Components/date/date.component";
import { DeleteComponent } from "../Add-on Components/delete/delete.component";
import { TextboxComponent } from "../Add-on Components/textbox/textbox.component";
import { E_ActionType, E_SelectMode, E_datatype } from '../Enum/enum';
import { AppService } from '../app.service';
import { IActionDef, I_ColumnDef, I_Data, IsHideButton } from '../common-interface/common-interface';

@Component({
    selector: 'app-bulk-view',
    standalone: true,
    templateUrl: './bulk-view.component.html',
    styleUrl: './bulk-view.component.css',
    imports: [CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, DeleteComponent, DateComponent, TextboxComponent]
})
export class BulkViewComponent {
  data: FormGroup;
  datas: I_ColumnDef[] = [];

  constructor(private appService: AppService) {
   
    this.datas = [];
    this.data = new FormGroup({
      Field: new FormControl(''),
    });

    
  
    // const OldData = this.appService.getItem('OldData');
    // const localdata = this.appService.getItem('localdata');

    // if (OldData !== null && localdata !== null) {
    //   if (OldData === localdata) {
    //     alert('same value')
    //   } else {
    //     alert('Different Value')
    //   }
    // } else if (OldData === null && localdata === null) {
    //   alert('Both items are not present in local storage.');
    // } else {
    //   alert('One of the items is not present in local storage.');
    // }
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
  CreateObj: any = {};
  isCreate = true;
  isDelete = true;
  isEdit = true;
  GridCheckedData: any[] = [];
  GridCheckAll: boolean = false;
  isFilter =false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;
  isdeletec=false;
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
    if (this.page !== data) {
      this.page = data;
    }
  }
  itemsPerPageChanged(): void {
    this.page = 1; // Reset current page to 1
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



  onSubmit() { debugger
    const localdatas = this.data.value;
    this.appService.saveGridData(localdatas);
    this.data.reset();
    // const lastIndex =this.gridData[this.gridData.length - 1];

    }
    BulkEditData:any="";
    bulkview(){
      this.BulkEditData=!this.BulkEditData
      debugger
      this.BulkEditData = "";
      for (let index = 1; index <= this.gridData.length; index++) {
        let _row = this.gridData[index-1];
        // let line = _row.Field + ":";
        let line ="";
        for (let j = 0; j <  this.columnDefs.length; j++) {
          line=line+ _row[this.columnDefs[j].Field]+  ":";
        }
        line.substring(0,1);
             
        if (this.gridData.length > index)
          this.BulkEditData += line + "\n";
        else
          this.BulkEditData += line
      }
    }

    gridDataarray:any;
changeBulkEditData($event: any) {
  debugger;
  let gridDataarray = this.BulkEditData.split(/\n/);
  this.gridData = [];

  for (let entry of gridDataarray) {
    let [ entitytypeid ,caseid ,agentname ,createtimedate ] = entry.split(":");
    let temp: I_Data = {
      EntityTypeId: entitytypeid ,
      CaseId: caseid ,
      AgentName:agentname ,
      CreatedDatetime:createtimedate,
      
    };
     this.gridData.push(temp);

  }

}

// Inputchange($event:any){

//   let lastobject=this.gridData[this.gridData.length - 1];
//   if (lastobject && lastobject.EntityTypeId !== ''){
//     let model: I_Data = Object.assign({});
//     model.EntityTypeId='';
//     this.gridData.push(model);
// }

//   }


InputChangesO($event: any) {
  debugger;
console.log('before',this.CreateObj)
  if (this.CreateObj !== "" ) {
  
    this.gridData.push(this.CreateObj);
    this.CreateObj={};
    const localdatas = this.data.value;
    this.appService.saveGridData(localdatas);
    this.data.reset();
  }
  console.log('after',this.CreateObj)


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
