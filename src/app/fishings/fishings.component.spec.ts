import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingsComponent } from './fishings.component';

describe('FishingsComponent', () => {
  let component: FishingsComponent;
  let fixture: ComponentFixture<FishingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
