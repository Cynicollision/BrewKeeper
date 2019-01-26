import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material';

export interface DialogConfig<T> {
  mode: DialogMode;
  data?: T;
  preventClose?: boolean;
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
  private currentDialog: MatDialogRef<any, any>;

  constructor(public dialog: MatDialog) {
  }

  public popDialog<T,V>(componentType: ComponentType<T>, config: DialogConfig<any>): Promise<DialogResult<V>> {
    if (this.active) {
      return Promise.resolve({ cancelled: true, success: true });
    }
    return new Promise((resolve, reject) => {
      this.active = true;
      
      return Promise.resolve().then(() => {
        let dialogConfig = {
          data: config || { mode: DialogMode.view },
          disableClose: config.preventClose || false,
          width: '350px',
        }

        this.currentDialog = this.dialog.open(componentType, dialogConfig);
        this.currentDialog.afterClosed()
          .subscribe(result => {
            this.active = false;
            this.currentDialog = null;

            resolve(result || { cancelled: true });
          });
      });
    });
  }

  public closeCurrentDialog(): void {
    if (this.currentDialog) {
      this.currentDialog.close();
    }
  }
}
