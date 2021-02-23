import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatselectionComponent } from './subcatselection.component';

describe('SubcatselectionComponent', () => {
  let component: SubcatselectionComponent;
  let fixture: ComponentFixture<SubcatselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
