import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageExploreSpotsComponent } from './home-page-explore-spots.component';

describe('HomePageExploreSpotsComponent', () => {
  let component: HomePageExploreSpotsComponent;
  let fixture: ComponentFixture<HomePageExploreSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageExploreSpotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageExploreSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
