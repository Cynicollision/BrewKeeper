import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Brew } from './../../../../shared/models/Brew';
import { BrewDialogComponent } from '../brew-dialog/brew-dialog.component';
import { ListItem } from './../core/list/list.component';
import { DialogConfig, DialogMode, DialogResult, DialogService } from '../core/dialog.service';
import { ProfileDataService } from '../core/profile-data.service';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.scss']
})
export class BrewListComponent implements OnInit {
  public brews: ListItem[];

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private profileDataService: ProfileDataService) { 
  }

  ngOnInit() {
    this.brews = [];

    this.profileDataService.brewData.subscribe(brews => {
      this.brews = brews.map(brew => this.mapBrewToListItem(brew));
    });
  }

  addBrew(event: Event): void {
    this.popBrewDialog(DialogMode.new).then((result: DialogResult<Brew>) => {
      if (result.success && result.message) {
        this.addBrewListItem(result.data);
        this.snackBar.open(result.message, 'Success');
      }
    });
  }

  private addBrewListItem(newBrew: Brew): void {
    this.brews.push(this.mapBrewToListItem(newBrew));
    this.profileDataService.updateBrews(this.brews);
  }

  private mapBrewToListItem(brew: Brew): ListItem {
    return { id: brew.id, name: brew.name };
  }

  viewBrew(brewID: string): void {
    // TODO: open in 'view' mode, then let dialog change itself to 'edit'
    this.popBrewDialog(DialogMode.edit, brewID).then((result: DialogResult<Brew>) => {
      if (result.success && result.message) {
        this.updateBrewListItem(result.data);
        this.snackBar.open(result.message, 'Success');
      }
    });
  }

  private updateBrewListItem(newData: Brew): void {
    let updatedBrew = this.brews.find(brew => brew.id === newData.id);
    updatedBrew.name = newData.name;
    // TODO: update other properties
    this.profileDataService.updateBrews(this.brews);
  }

  private popBrewDialog(mode: DialogMode, brewID?: string): Promise<DialogResult<Brew>> {
    let brew: Brew = null;
    if (brewID) {
      brew = this.brews.find(brew => brew.id === brewID);
    }

    let config: DialogConfig<Brew> = {
      mode: mode,
      data: brew,
    };

    return this.dialogService.popDialog(BrewDialogComponent, config)
      .then((result: DialogResult<Brew>) => {
        if (!result.success && !result.cancelled) {
          this.handleServiceError(result.message);
        }
        return Promise.resolve(result);
      });
  }

  private handleServiceError(internalMessage?: string): void {
    this.snackBar.open(`Something went wrong... ${internalMessage || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
