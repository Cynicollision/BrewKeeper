import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

export enum Navigable {
  Home,
  BrewList,
  BrewDetail,
  RecipeList,
  RecipeDetail,
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private routeMap = new Map<Navigable, string>();
  private current: Navigable;

  constructor(private route: ActivatedRoute, private router: Router) { 
      this.routeMap.set(Navigable.Home, '/');
      this.routeMap.set(Navigable.BrewList, '/brews');
      this.routeMap.set(Navigable.BrewDetail, '/brew');
      this.routeMap.set(Navigable.RecipeList, '/recipes');
      this.routeMap.set(Navigable.RecipeDetail, '/recipe/');

      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          let route = this.route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          route.data.subscribe(data => {
            this._currentTitle = data.title;
          }).unsubscribe();
        }
      })
    }

    private _currentTitle: string = 'Brew Keeper';
    get currentTitle(): string {
      return this._currentTitle;
    }

    goTo(target: Navigable) {
      this.router.navigate([this.routeMap.get(target)]);
    }

    goToResource(target: Navigable, id: string) {
      this.router.navigate([this.routeMap.get(target), id]);
    }
}
