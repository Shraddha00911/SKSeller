import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemschememasterdetailComponent } from './itemschememasterdetail.component';

describe('ItemschememasterdetailComponent', () => {
  let component: ItemschememasterdetailComponent;
  let fixture: ComponentFixture<ItemschememasterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemschememasterdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemschememasterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
