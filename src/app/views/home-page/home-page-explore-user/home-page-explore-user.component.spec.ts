import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageExploreUserComponent } from './home-page-explore-user.component';

describe('HomePageExploreUserComponent', () => {
  let component: HomePageExploreUserComponent;
  let fixture: ComponentFixture<HomePageExploreUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageExploreUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageExploreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
