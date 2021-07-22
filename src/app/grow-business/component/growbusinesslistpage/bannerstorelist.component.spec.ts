import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerstorelistComponent } from './bannerstorelist.component';

describe('BannerstorelistComponent', () => {
  let component: BannerstorelistComponent;
  let fixture: ComponentFixture<BannerstorelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerstorelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerstorelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
