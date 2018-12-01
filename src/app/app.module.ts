import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTableComponent } from './pages/basic-table/basic-table.component';
import { IssueFormComponent } from './pages/search-table/issue-form/issue-form.component';
import { IssueLabelComponent } from './pages/search-table/issue-label/issue-label.component';
import { IssueListComponent } from './pages/search-table/issue-list/issue-list.component';
import { SearchTableComponent } from './pages/search-table/search-table.component';
import { ThemeDemoComponent } from './pages/theme-demo/theme-demo.component';
import { ShareModule } from './share/share.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SearchTableComponent,
    BasicTableComponent,
    IssueListComponent,
    IssueLabelComponent,
    IssueFormComponent,
    ThemeDemoComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ShareModule
  ],
  providers   : [ { provide: NZ_I18N, useValue: zh_CN } ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
