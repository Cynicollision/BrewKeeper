import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatCardModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ListComponent } from './../core/list/list.component';
import { BrewListComponent } from './brew-list.component';

describe('BrewListComponent', () => {
  let component: BrewListComponent;
  let fixture: ComponentFixture<BrewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatSnackBarModule, 
        HttpClientTestingModule, 
        RouterTestingModule,
       ],
      declarations: [ 
        BrewListComponent, 
        ListComponent,
      ]
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
