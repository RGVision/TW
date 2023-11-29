import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListofpagesComponent } from "./listofpages/listofpages.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, ListofpagesComponent]
})
export class AppComponent {

}
