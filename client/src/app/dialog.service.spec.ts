import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { DialogService } from './dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MatDialogModule,
    ],
  }));

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService);
    expect(service).toBeTruthy();
  });
});
