import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I_ColumnDef } from '../../common-interface/common-interface';

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.css'
})
export class TextboxComponent {
  @Input() columnDefs:I_ColumnDef[] = [];
  CreateObj: any = {};
  @Input()  gridData:any[]=[];

  @Output() inputaddtabledata = new EventEmitter<{ inputtext: any }>();

  
  InputChangesO($event: any) {

  this.inputaddtabledata.emit({inputtext:this.CreateObj});
  }
}
