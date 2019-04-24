import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBoatsComponent } from './bank-boats.component';

describe('BankBoatsComponent', () => {
  let component: BankBoatsComponent;
  let fixture: ComponentFixture<BankBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
