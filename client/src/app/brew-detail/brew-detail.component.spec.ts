import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule } from '@angular/material';
import { BrewDetailComponent } from './brew-detail.component';

describe('BrewDetailComponent', () => {
  let component: BrewDetailComponent;
  let fixture: ComponentFixture<BrewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSelectModule,
      ],
      declarations: [ 
        BrewDetailComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
