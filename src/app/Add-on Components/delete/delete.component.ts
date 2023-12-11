import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  @Input()  gridData:any[]=[];

  ngOnInit(): void {

}
@Input() nowDelete: boolean = false;
@Input() commonClass: any;
@Input() deleteClass: any;
@Input() cancelClass: any;
@Input() successClass: any;
@Output() deleteMethod = new EventEmitter<{ data: any }>();


checkDelete() { 
  this.nowDelete = true;
}

_deleteMethod() { 
  this.nowDelete = false;
  this.deleteMethod.emit({data:this.gridData})
}
}
