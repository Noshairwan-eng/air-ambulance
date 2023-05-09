import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightwareComponent } from './flightware.component';

describe('FlightwareComponent', () => {
  let component: FlightwareComponent;
  let fixture: ComponentFixture<FlightwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
