import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestComponent } from './pages/request/request.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { OfferComponent } from './pages/offer/offer.component';
import { OffersComponent } from './pages/offers/offers.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { FlightwareComponent } from './pages/flightware/flightware.component';
import { AirportsComponent } from './pages/airports/airports.component';
import { AirportSuggestionComponent } from './common/airport-suggestion/airport-suggestion.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CompleteFlightsComponent } from './pages/complete-flights/complete-flights.component';
import { LostComponent } from './pages/lost/lost.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "request",
    component: RequestComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "request/:id",
    component: RequestComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "requests",
    component: RequestsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "offer",
    component: OfferComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "offer/:id",
    component: OfferComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "offers",
    component: OffersComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "invoice",
    component: InvoiceComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "invoice/:id",
    component: InvoiceComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "invoices",
    component: InvoicesComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "supplier",
    component: SupplierComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "supplier/:id",
    component: SupplierComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "suppliers",
    component: SuppliersComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "flightware",
    component: FlightwareComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "airports",
    component: AirportsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "airport-suggestion",
    component: AirportSuggestionComponent    
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "completed-flights",
    component: CompleteFlightsComponent
  },
  {
    path: "lost",
    component: LostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
