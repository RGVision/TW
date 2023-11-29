import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofpagesComponent } from './listofpages.component';

describe('ListofpagesComponent', () => {
  let component: ListofpagesComponent;
  let fixture: ComponentFixture<ListofpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListofpagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListofpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
