import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuItemComponent } from './sub-menu-item.component';

describe('SubMenuItemComponent', () => {
  let component: SubMenuItemComponent;
  let fixture: ComponentFixture<SubMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
