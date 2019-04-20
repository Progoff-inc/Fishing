import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishingComponent } from './add-fishing.component';

describe('AddFishingComponent', () => {
  let component: AddFishingComponent;
  let fixture: ComponentFixture<AddFishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
