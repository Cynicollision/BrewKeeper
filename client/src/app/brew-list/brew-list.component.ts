import { Component, OnInit } from '@angular/core';
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
  constructor(private brewService: BrewService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.brews = [];
    this.brews.push({ name: 'IPA' });
    this.brews.push({ name: 'Porter' });

    // TODO: test code, replace w/ retrieval of brew list
    this.brewService.get('24680').then(response => {
      if (response.success) {
        let brew = response.data;
        this.brews.push({ name: brew.name || 'No Name' });
      }
      else {
        this.handleServiceError(response.message);
      }
    });
  }

  private handleServiceError(internalMessage?: string): void {
    this.snackBar.open(`Something went wrong... ${internalMessage || ''}`, 'Error', {
      duration: 5000,
    });
  }
}
