import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { I_ColumnDef, } from '../Column-Def/IColumnDef';
import { E_datatype } from '../Enum/enum';
@Component({
  selector: 'app-common-card',
  standalone: true,
  imports: [CommonModule ,NgxPaginationModule , FormsModule],
  templateUrl: './common-card.component.html',
  styleUrl: './common-card.component.scss'
})
export class CommonCardComponent implements OnInit{

  ngOnInit(): void {
    if(this.gridData.length > 0){
      this.tempGridData = this.gridData;
    }
  }


datatype:E_datatype = E_datatype.card;
//  switchVar='A';
//  changeswitch():void{
//    this.switchVar='C';
//  }
  @Input() card: any;
  @Input() columnDefs:I_ColumnDef[] = [];
  @Input()  gridData:any[]=[];
  tempGridData:any[]=[];
  GridFilter: any = {};
  isFilter =false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;




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

        getsearchfilter($event: KeyboardEvent) { debugger
          this.tempFiltergridData =  this.tempGridData;
          for (let key in this.GridFilter) {
            this.tempFiltergridData = this.tempFiltergridData.filter((x) => {
              if (x[key] && (x[key]).toLowerCase().indexOf((this.GridFilter[key].trim()).toLowerCase()) > -1) {
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



}

