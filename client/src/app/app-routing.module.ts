import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormTestComponent } from './form-test/form-test.component';
import { BrewListComponent } from './brew-list/brew-list.component';
import { BrewComponent } from './brew/brew.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'brews', component: BrewListComponent },
  { path: 'brews/new', component: BrewComponent },
  { path: 'brews/edit/:id', component: BrewComponent },
  { path: 'brews/view/:id', component: BrewComponent },
  { path: 'form', component: FormTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
