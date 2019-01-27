import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule, 
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule, 
  MatSidenavModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDatepickerModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './core/list/list.component';
import { HomeComponent } from './home/home.component';
import { BrewListComponent } from './brew-list/brew-list.component';
import { BrewDialogComponent } from './brew-dialog/brew-dialog.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LoginComponent } from './login/login.component';
import { WaitSpinnerComponent } from './core/wait-spinner/wait-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    BrewListComponent,
    BrewDialogComponent,
    CreateProfileComponent,
    LoginComponent,
    WaitSpinnerComponent,
  ],
  entryComponents: [
    BrewDialogComponent,
    CreateProfileComponent,
    WaitSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
