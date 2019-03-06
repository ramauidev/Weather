import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppContentComponent } from './app-content/app-content.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import {AppService} from "./app.service";
import { HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppModel} from "./app.model";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppContentComponent,
    AppFooterComponent,
    ForecastDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AppService, AppModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
