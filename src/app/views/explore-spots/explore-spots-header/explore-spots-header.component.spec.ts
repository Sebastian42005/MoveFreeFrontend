import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSpotsHeaderComponent } from './explore-spots-header.component';

describe('ExploreSpotsHeaderComponent', () => {
  let component: ExploreSpotsHeaderComponent;
  let fixture: ComponentFixture<ExploreSpotsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSpotsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSpotsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
