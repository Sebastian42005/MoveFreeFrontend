import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSpotsFilterComponent } from './explore-spots-filter.component';

describe('ExploreSpotsFilterComponent', () => {
  let component: ExploreSpotsFilterComponent;
  let fixture: ComponentFixture<ExploreSpotsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSpotsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSpotsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
