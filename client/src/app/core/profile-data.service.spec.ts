import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileDataService } from './profile-data.service';

describe('ProfileDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: ProfileDataService = TestBed.get(ProfileDataService);
    expect(service).toBeTruthy();
  });
});
