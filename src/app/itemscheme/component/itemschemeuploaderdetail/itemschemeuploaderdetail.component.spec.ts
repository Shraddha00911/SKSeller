import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemschemeuploaderdetailComponent } from './itemschemeuploaderdetail.component';

describe('ItemschemeuploaderdetailComponent', () => {
  let component: ItemschemeuploaderdetailComponent;
  let fixture: ComponentFixture<ItemschemeuploaderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemschemeuploaderdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemschemeuploaderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
