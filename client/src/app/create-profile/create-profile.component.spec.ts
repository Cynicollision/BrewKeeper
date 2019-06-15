import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatInputModule, MatFormFieldModule, MatDialogRef, MatSnackBarModule } from '@angular/material';
import { CreateProfileComponent } from './create-profile.component';
import { AuthService } from '../core/auth.service';
import { NotifyService } from '../core/notify.service';

describe('CreateProfileComponent', () => {
  let component: CreateProfileComponent;
  let fixture: ComponentFixture<CreateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      declarations: [ 
        CreateProfileComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        AuthService,
        NotifyService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
