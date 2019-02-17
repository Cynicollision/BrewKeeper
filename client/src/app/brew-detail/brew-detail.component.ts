import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { APIService } from '../core/api.service';
import { ProfileDataService } from '../core/profile-data.service';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';
import { Brew } from '../../../../shared/models/Brew';
import { WaitService } from '../core/wait.service';

@Component({
  selector: 'app-brew-detail',
  templateUrl: './brew-detail.component.html',
  styleUrls: ['./brew-detail.component.scss']
})
export class BrewDetailComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  data: Brew = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: APIService,
    private profileDataService: ProfileDataService,
    private waitService: WaitService) {
  }

  private _isNew = false;
  get isNew(): boolean {
    return this._isNew;
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      let brewID = params['id'];
      this._isNew = (brewID || '0') === '0';

      if (this._isNew) {
        return;
      }

      this.subscriptions.push(this.profileDataService.brewData.subscribe(brews => {
        let brew = brews.find(b => b.id === brewID);
        this.data = {...brew } || {};

        if (!brew) {
          this.handleError(`Couldn't find data for brew ID: ${brewID}`);
          this.router.navigate(['/brews']);
        }
      }));
   }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  save(): void {
    let savePromise = this.isNew
      ? this.apiService.createBrew(this.data)
      : this.apiService.updateBrew(this.data);

    this.waitService.wait(savePromise).then((response: OperationResponse<Brew>) => {
      if (!response.success) {
        this.handleError(response.message);
        return;
      }
      this.profileDataService.updateBrew(response.data);
      this.router.navigate(['/brews']);
    });
  }

  cancel(): void {
    this.router.navigate(['/brews']);
  }

  private handleError(message?: string): void {
    this.snackBar.open(`Something went wrong... ${message || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
