import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkViewComponent } from './bulk-view.component';

describe('BulkViewComponent', () => {
  let component: BulkViewComponent;
  let fixture: ComponentFixture<BulkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
