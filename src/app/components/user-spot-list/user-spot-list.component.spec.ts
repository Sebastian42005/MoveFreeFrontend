import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpotListComponent } from './user-spot-list.component';

describe('UserSpotListComponent', () => {
  let component: UserSpotListComponent;
  let fixture: ComponentFixture<UserSpotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSpotListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSpotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
