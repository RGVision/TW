import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommongridData } from './grid-data/grid-data';
import { ListofpagesComponent } from "./listofpages/listofpages.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, ListofpagesComponent , ReactiveFormsModule]
})

export class AppComponent {
    @Input() gridData:any[]=CommongridData;
    private localdata = this.gridData;
    @Output() OldData: any;

ngOnInit(){
   this.OldData  =  localStorage.setItem('OldData', JSON.stringify(this.localdata))
}



}
