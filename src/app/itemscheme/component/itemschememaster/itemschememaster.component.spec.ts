import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemschememasterComponent } from './itemschememaster.component';

describe('ItemschememasterComponent', () => {
  let component: ItemschememasterComponent;
  let fixture: ComponentFixture<ItemschememasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemschememasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemschememasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
