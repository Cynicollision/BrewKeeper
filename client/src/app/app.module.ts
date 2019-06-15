import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { 
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
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
  MatDatepickerModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmComponent } from './core/confirm/confirm.component';
import { ListComponent } from './core/list/list.component';
import { WaitSpinnerComponent } from './core/wait-spinner/wait-spinner.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LoginComponent } from './login/login.component';
import { BrewDetailComponent } from './brew-detail/brew-detail.component';
import { BrewListComponent } from './brew-list/brew-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    ListComponent,
    WaitSpinnerComponent,
    HomeComponent,
    AboutComponent,
    CreateProfileComponent,
    LoginComponent,
    BrewDetailComponent,
    BrewListComponent,
    RecipeDetailComponent,
    RecipeListComponent,
  ],
  entryComponents: [
    ConfirmComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
