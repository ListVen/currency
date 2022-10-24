import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/converter', pathMatch: 'full' },
  {
    path: 'converter',
    loadComponent: () =>
      import('./pages/converter/converter.component').then((m) => m.ConverterComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
