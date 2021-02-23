import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcfrarticlesComponent } from './uploadcfrarticles.component';

describe('UploadcfrarticlesComponent', () => {
  let component: UploadcfrarticlesComponent;
  let fixture: ComponentFixture<UploadcfrarticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcfrarticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcfrarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
