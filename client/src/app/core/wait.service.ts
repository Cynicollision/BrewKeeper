import { Injectable } from '@angular/core';
import { DialogService, DialogMode } from './dialog.service';
import { WaitSpinnerComponent } from './wait-spinner/wait-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class WaitService {
  
  // threshold in milliseconds to wait before showing the "wait" spinner
  private readonly WaitThreshold = 500;

  constructor(private dialogService: DialogService) {
  }

  wait<T>(waitingOn: Promise<T>): Promise<T> {
    
    return new Promise((resolve, reject) => {
      let waitingOnComplete = false;
      let wrappingPromise = Promise.resolve<any>(null);

      waitingOn.then(result => {
        waitingOnComplete = true;
        this.dialogService.closeCurrentDialog();
        wrappingPromise.then(() => resolve(result));
      });

      setTimeout(() => {
        if (!waitingOnComplete) {
          wrappingPromise = this.dialogService.popDialog(WaitSpinnerComponent, { mode: DialogMode.view, preventClose: true });
        }
      }, this.WaitThreshold);
    });
  }
}
