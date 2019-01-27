import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormField, MatInput, MatDialogModule, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule, MatDialogRef, MatDatepicker, MatDatepickerModule, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, MatDatepickerToggle } from '@angular/material';
import { BrewDialogComponent } from './brew-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BrewDialogComponent', () => {
  let component: BrewDialogComponent;
  let fixture: ComponentFixture<BrewDialogComponent>;

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
      ],
      declarations: [ 
        BrewDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
