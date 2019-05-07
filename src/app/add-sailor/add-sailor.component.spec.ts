import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSailorComponent } from './add-sailor.component';

describe('AddSailorComponent', () => {
  let component: AddSailorComponent;
  let fixture: ComponentFixture<AddSailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSailorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
