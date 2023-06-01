import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotProfileComponent } from './spot-profile.component';

describe('SpotProfileComponent', () => {
  let component: SpotProfileComponent;
  let fixture: ComponentFixture<SpotProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
