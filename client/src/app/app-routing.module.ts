import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTestComponent } from './form-test/form-test.component';

const routes: Routes = [
  { path: 'form', component: FormTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
