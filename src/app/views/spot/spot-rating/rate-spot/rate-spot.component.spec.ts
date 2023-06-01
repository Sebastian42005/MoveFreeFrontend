import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSpotComponent } from './rate-spot.component';

describe('RateSpotComponent', () => {
  let component: RateSpotComponent;
  let fixture: ComponentFixture<RateSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateSpotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
