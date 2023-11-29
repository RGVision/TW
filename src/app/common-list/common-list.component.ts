import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { I_ColumnDef, } from '../Column-Def/IColumnDef';
import { E_datatype } from '../Enum/enum';
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
  @Input() list: any;
  @Input() columnDefs:I_ColumnDef[] = [];
  @Input()  gridData:any[]=[];
  tempGridData:any[]=[];
  GridFilter: any = {};
  isFilter =false;
  buttonName ='Open Filter';
  tempFiltergridData:any[]=[];
  itemsPerPages=5;

  page :any;
  pagechange(data:any){ debugger
    this.page = data;
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

