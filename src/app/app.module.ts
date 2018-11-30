import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IssueLabelComponent } from './pages/search-table/issue-label/issue-label.component';
import { IssueListComponent } from './pages/search-table/issue-list/issue-list.component';
import { SearchTableComponent } from './pages/search-table/search-table.component';
import { BasicTableComponent } from './pages/basic-table/basic-table.component';
import { ShareModule } from './share/share.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SearchTableComponent,
    BasicTableComponent,
    IssueListComponent,
    IssueLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ShareModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
