import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BrewDialogComponent } from '../brew-dialog/brew-dialog.component';
import { ListItem } from './../list/list.component';
import { BrewService } from './../brew.service';
import { DialogConfig, DialogMode, DialogResult, DialogService } from './../dialog.service';
import { Brew } from './../../../../shared/models/Brew';

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
    private brewService: BrewService) { 
  }

  ngOnInit() {
    this.brews = [];
    
    // TODO: test code, replace w/ retrieval of brew list
    this.brews.push({ id: '123', name: 'IPA' });
    this.brews.push({ id: '456', name: 'Porter' });

    this.brewService.get('24680').then(response => {
      if (response.success) {
        let brew = response.data;
        this.brews.push({ id: '24680', name: brew.name || 'No Name' });
      }
      else {
        this.handleServiceError(response.message);
      }
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

  private addBrewListItem(newData: Brew): void {
    this.brews.push({ id: newData.id, name: newData.name });
  }

  viewBrew(brewID: string): void {
    // TODO: open in 'view' mode, then let dialog change itself to 'edit'
    this.popBrewDialog(DialogMode.edit, brewID).then((result: DialogResult<Brew>) => {
      if (result.success && result.message) {
        this.updateBrewListItem(result.data)
        this.snackBar.open(result.message, 'Success');
      }
    });
  }

  private updateBrewListItem(newData: Brew): void {
    let updatedBrew = this.brews.find(brew => brew.id === newData.id);
    updatedBrew.name = newData.name;
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
        if (!result.success) {
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
