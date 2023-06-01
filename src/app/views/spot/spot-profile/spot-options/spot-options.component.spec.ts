import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotOptionsComponent } from './spot-options.component';

describe('SpotOptionsComponent', () => {
  let component: SpotOptionsComponent;
  let fixture: ComponentFixture<SpotOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
