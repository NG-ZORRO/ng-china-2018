import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { SearchTableComponent } from './search-table/search-table.component';

const routes: Routes = [
  {
    path     : 'basic-table',
    component: BasicTableComponent,
    data     : {
      breadcrumb: 'Basic Table'
    }
  },
  {
    path     : 'search-table',
    component: SearchTableComponent,
    data     : {
      breadcrumb: 'Search Table'
    }
  },
  {
    path      : '**',
    redirectTo: 'search-table',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
