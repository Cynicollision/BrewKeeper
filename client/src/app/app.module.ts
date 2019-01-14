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
  MatRadioModule,
  MatSelectModule, 
  MatSidenavModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule, 
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { BrewListComponent } from './brew-list/brew-list.component';
import { BrewDialogComponent } from './brew-dialog/brew-dialog.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ListComponent,
    BrewListComponent,
    BrewDialogComponent,
    CreateProfileComponent,
  ],
  entryComponents: [
    BrewDialogComponent,
    CreateProfileComponent,
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
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
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
