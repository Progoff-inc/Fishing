import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorsComponent } from './sailors.component';

describe('SailorsComponent', () => {
  let component: SailorsComponent;
  let fixture: ComponentFixture<SailorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
