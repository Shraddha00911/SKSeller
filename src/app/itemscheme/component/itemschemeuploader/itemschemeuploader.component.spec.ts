import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemschemeuploaderComponent } from './itemschemeuploader.component';

describe('ItemschemeuploaderComponent', () => {
  let component: ItemschemeuploaderComponent;
  let fixture: ComponentFixture<ItemschemeuploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemschemeuploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemschemeuploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
