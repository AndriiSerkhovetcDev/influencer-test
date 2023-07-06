import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSearchComponent } from './@shared/components/user-search/user-search.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AutocompleteComponent } from './@shared/components/autocomplete/autocomplete.component';
import { UserProfileComponent } from './@shared/components/user-profile/user-profile.component';
import { ShortFormatPipe } from './@shared/pipes/short-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    AutocompleteComponent,
    UserProfileComponent,
    ShortFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
