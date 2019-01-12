import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrewListComponent } from './brew-list/brew-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'brews', component: BrewListComponent },
  { path: 'callback', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
