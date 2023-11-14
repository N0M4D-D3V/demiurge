import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemiurgeComponent } from './demiurge.component';

describe('DemiurgeComponent', () => {
  let component: DemiurgeComponent;
  let fixture: ComponentFixture<DemiurgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemiurgeComponent]
    });
    fixture = TestBed.createComponent(DemiurgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
