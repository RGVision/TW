import { Injectable, Input } from '@angular/core';
import { CommongridData } from './grid-data/grid-data';


@Injectable({
  providedIn: 'root'
})

export class AppService {
  @Input() gridData:any[]=CommongridData;
  private localStorageKey = 'localdata';
  private localdata = this.gridData;
  
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  saveGridData(Dynamictable: any) {
    const existingData = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    existingData.push(Dynamictable);
    if(localStorage.getItem('OldData')?.length != existingData){
      let UpdatedData = localStorage.setItem('localdata', JSON.stringify(this.localdata));
    }
  }

  getGridTable(): any[]  {
    const savedData = localStorage.getItem('localdata');
    return savedData ? JSON.parse(savedData) : [];
  }
}
