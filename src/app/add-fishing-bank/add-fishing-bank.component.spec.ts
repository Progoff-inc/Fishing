import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishingBankComponent } from './add-fishing-bank.component';

describe('AddFishingBankComponent', () => {
  let component: AddFishingBankComponent;
  let fixture: ComponentFixture<AddFishingBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFishingBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFishingBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
