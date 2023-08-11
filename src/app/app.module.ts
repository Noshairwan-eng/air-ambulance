import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestComponent } from './pages/request/request.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { LoaderComponent } from './common/loader/loader.component';
import { OfferComponent } from './pages/offer/offer.component';
import { OffersComponent } from './pages/offers/offers.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FlightwareComponent } from './pages/flightware/flightware.component';
import { AirportsComponent } from './pages/airports/airports.component';
import { AirportSuggestionComponent } from './common/airport-suggestion/airport-suggestion.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    LoginComponent,
    HomeComponent,
    RequestComponent,
    RequestsComponent,
    LoaderComponent,
    OfferComponent,
    OffersComponent,
    InvoiceComponent,
    InvoicesComponent,
    SupplierComponent,
    SuppliersComponent,
    FooterComponent,
    FlightwareComponent,
    AirportsComponent,
    AirportSuggestionComponent,
    CustomersComponent,
    SettingsComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
