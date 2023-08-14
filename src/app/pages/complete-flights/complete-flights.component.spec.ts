import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFlightsComponent } from './complete-flights.component';

describe('CompleteFlightsComponent', () => {
  let component: CompleteFlightsComponent;
  let fixture: ComponentFixture<CompleteFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteFlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
