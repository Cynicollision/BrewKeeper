import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';
import { ListComponent } from './../list/list.component';
import { BrewListComponent } from './brew-list.component';

describe('BrewListComponent', () => {
  let component: BrewListComponent;
  let fixture: ComponentFixture<BrewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatListModule ],
      declarations: [ BrewListComponent, ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
