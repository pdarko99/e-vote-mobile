import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab-nav',
    component: TabPage,
    children: [
      {
        path: 'results',
        loadChildren: () => import('../results/results.module').then(m => m.ResultsPageModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../details/details.module').then(m => m.DetailsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab/tab-nav/results'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
