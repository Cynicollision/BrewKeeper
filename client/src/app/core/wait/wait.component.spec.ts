import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitComponent } from './wait.component';
import { MatSpinner } from '@angular/material';

describe('WaitComponent', () => {
  let component: WaitComponent;
  let fixture: ComponentFixture<WaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatSpinner,
        WaitComponent,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
