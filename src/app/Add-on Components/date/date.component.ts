import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})

export class DateComponent {
  @Input() gridData:any[] = [];
  @Output() dateSelected = new EventEmitter<string>();
  datepicker!: string;

ngOnInit(): void {

}

datechange(){
  console.log("Date Component",this.datepicker)
  this.dateSelected.emit(this.datepicker);
}
}
