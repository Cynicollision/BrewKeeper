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
  cancelled?: boolean;
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private active = false;

  constructor(public dialog: MatDialog) {
  }

  public popDialog<T,V>(componentType: ComponentType<T>, config: DialogConfig<any>): Promise<DialogResult<V>> {
    if (this.active) {
      return Promise.resolve({ cancelled: true, success: true });
    }
    return new Promise((resolve, reject) => {
      this.active = true;
      this.dialog.open(componentType, {
        width: '350px',
        data: config || {
          mode: DialogMode.view,
        },
      })
      .afterClosed()
      .subscribe(result => {
        this.active = false;
        resolve(result || { cancelled: true });
      });
    });
  }
}
