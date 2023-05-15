import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSelecterComponent } from './profile-selecter.component';

describe('ProfileSelecterComponent', () => {
  let component: ProfileSelecterComponent;
  let fixture: ComponentFixture<ProfileSelecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSelecterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
