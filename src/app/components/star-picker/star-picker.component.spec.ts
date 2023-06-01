import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPickerComponent } from './star-picker.component';

describe('StarPickerComponent', () => {
  let component: StarPickerComponent;
  let fixture: ComponentFixture<StarPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
