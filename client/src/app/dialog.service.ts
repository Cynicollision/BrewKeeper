import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material';

export interface DialogConfig<T> {
  mode: DialogMode;
  data?: T;
}

export enum DialogMode {
  edit = 'edit',
  new = 'new',
  view = 'view',
}

export interface DialogResult<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  public popDialog<T,V>(componentType: ComponentType<T>, config: DialogConfig<any>): Promise<DialogResult<V>> {
    return new Promise((resolve, reject) => {
      this.dialog.open(componentType, {
        width: '350px',
        data: config,
      })
      .afterClosed()
      .subscribe(result => resolve(result));
    });
  }
}