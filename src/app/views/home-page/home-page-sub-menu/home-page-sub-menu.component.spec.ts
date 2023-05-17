import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSubMenuComponent } from './home-page-sub-menu.component';

describe('HomePageSubMenuComponent', () => {
  let component: HomePageSubMenuComponent;
  let fixture: ComponentFixture<HomePageSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageSubMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
