import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSpotComponent } from './upload-spot.component';

describe('UploadSpotComponent', () => {
  let component: UploadSpotComponent;
  let fixture: ComponentFixture<UploadSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSpotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
