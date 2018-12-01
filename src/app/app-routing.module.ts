import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTableComponent } from './pages/basic-table/basic-table.component';
import { SearchTableComponent } from './pages/search-table/search-table.component';
import { ThemeDemoComponent } from './pages/theme-demo/theme-demo.component';

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
    },
  },
  {
    path     : 'theme-demo',
    component: ThemeDemoComponent,
    data     : {
      breadcrumb: 'Theme Demo'
    },
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
