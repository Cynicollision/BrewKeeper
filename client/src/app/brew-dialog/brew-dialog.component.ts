import { Component, Inject, OnInit, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from '../api.service';
import { DialogConfig, DialogMode, DialogResult } from '../dialog.service';
import { Brew } from './../../../../shared/models/Brew';
import { OperationResponse } from '../../../../shared/contracts/OperationResponse';

@Component({
  selector: 'app-brew-dialog',
  templateUrl: './brew-dialog.component.html',
  styleUrls: ['./brew-dialog.component.scss']
})
export class BrewDialogComponent implements OnInit {
  public mode = DialogMode.view;

  private brewID: string;
  public brewName = '';

  constructor(public dialogRef: MatDialogRef<BrewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Brew>,
    private apiService: APIService) { 
  }

  ngOnInit() {
    this.mode = this.config.mode || DialogMode.view;
    
    let brewData = this.config.data || {};
    this.brewID = brewData.id || '';
    this.brewName = brewData.name || '';
  }

  close() {
    let next: Promise<DialogResult<Brew>> = Promise.resolve({ success: true });

    if (this.mode === DialogMode.new) {
      next = this.saveNewBrew(this.getBrewData());
    }
    else if (this.mode === DialogMode.edit) {
      next = this.updateBrew(this.getBrewData());
    }

    next.then((result: DialogResult<Brew>) => this.dialogRef.close(result));
  }

  private getBrewData(): Brew {
    return {
      id: this.brewID,
      name: this.brewName,
    };
  }

  private saveNewBrew(newBrew: Brew): Promise<DialogResult<Brew>> {
    return this.apiService.createBrew(newBrew).then((response: OperationResponse<Brew>) => {
      return {
        success: response.success,
        message: response.success ? 'Brew saved' : response.message,
        data: response.data,
      }
    });
  }

  private updateBrew(updatedBrew: Brew): Promise<DialogResult<Brew>> {
    return this.apiService.updateBrew(updatedBrew).then((response: OperationResponse<Brew>) => {
      return {
        success: response.success,
        message: response.success ? 'Brew saved' : response.message,
        data: response.data,
      }
    });
  }
}
