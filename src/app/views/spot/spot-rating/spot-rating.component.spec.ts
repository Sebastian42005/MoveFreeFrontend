import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotRatingComponent } from './spot-rating.component';

describe('SpotRatingComponent', () => {
  let component: SpotRatingComponent;
  let fixture: ComponentFixture<SpotRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
