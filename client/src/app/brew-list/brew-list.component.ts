import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ListItem } from './../list/list.component';
import { BrewService } from './../brew.service';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.scss']
})
export class BrewListComponent implements OnInit {

  brews: ListItem[];

  constructor(
    private brewService: BrewService, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.brews = [];
    this.brews.push({ id: '123', name: 'IPA' });
    this.brews.push({ id: '456', name: 'Porter' });

    // TODO: test code, replace w/ retrieval of brew list
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
    this.router.navigate(['/brews/new']);
  }

  viewBrew(brewID: string): void {
    this.router.navigate(['/brews/view', brewID]);
  }

  private handleServiceError(internalMessage?: string): void {
    this.snackBar.open(`Something went wrong... ${internalMessage || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
