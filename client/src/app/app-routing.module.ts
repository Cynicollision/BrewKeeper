import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './core/route-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrewDetailComponent } from './brew-detail/brew-detail.component';
import { BrewListComponent } from './brew-list/brew-list.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent, 
    canActivate: [ RouteGuardService ],
  },
  { 
    path: 'login', 
    component: LoginComponent,
  },
  { 
    path: 'callback', 
    component: LoginComponent,
    canActivate: [ RouteGuardService ],
  },
  { 
    path: 'brews', 
    component: BrewListComponent, 
    canActivate: [ RouteGuardService ],
  },
  { 
    path: 'brew/:id', 
    component: BrewDetailComponent, 
    canActivate: [ RouteGuardService ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
