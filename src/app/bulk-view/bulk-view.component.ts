import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommongridData } from '../grid-data/grid-data';

@Component({
  selector: 'app-bulk-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-view.component.html',
  styleUrl: './bulk-view.component.css'
})
export class BulkViewComponent {
  @Input() gridData = CommongridData;



}


