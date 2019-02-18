import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './core/route-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrewDetailComponent } from './brew-detail/brew-detail.component';
import { BrewListComponent } from './brew-list/brew-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Brew Keeper' },
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'Brew Keeper' },
  },
  { 
    path: 'callback', 
    component: LoginComponent,
    canActivate: [ RouteGuardService ],
    data: { title: 'Brew Keeper' },
  },
  { 
    path: 'brews', 
    component: BrewListComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'My brews' },
  },
  { 
    path: 'brew/:id', 
    component: BrewDetailComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Brew details' },
  },
  { 
    path: 'recipes', 
    component: RecipeListComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'My recipes' },
  },
  { 
    path: 'recipe/:id', 
    component: RecipeDetailComponent, 
    canActivate: [ RouteGuardService ],
    data: { title: 'Recipe details' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
