import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotTypeListComponent } from './spot-type-list.component';

describe('SpotTypeListComponent', () => {
  let component: SpotTypeListComponent;
  let fixture: ComponentFixture<SpotTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
