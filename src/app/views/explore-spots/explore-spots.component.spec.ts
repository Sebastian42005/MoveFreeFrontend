import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSpotsComponent } from './explore-spots.component';

describe('ExploreSpotsComponent', () => {
  let component: ExploreSpotsComponent;
  let fixture: ComponentFixture<ExploreSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSpotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
