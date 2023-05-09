import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AirportService } from 'src/app/service/airport/airport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent {

  // Search Criteria Filters
  S_AirportID:string = "";
  S_AirportName:string = "";
  S_ICAOCode:string = "";
  S_IATACode:string = "";
  S_AiportName:string = "";
  S_City:string = "";
  S_Country:string = "";
  
  // Loading Flags
  loadingAirports: boolean = false;

  // Global Objects
  Airports: Array<any> = [];
  InvoieCreationError: string = "";

  constructor(
    private airportService: AirportService,
    private router: Router
  ) {
    
  }


  GetAirports() {

  //  alert(this.S_AirportName);
  
    this.loadingAirports = true;
    this.airportService.FetchAirports(
      this.S_AirportID,
      this.S_ICAOCode,
      this.S_IATACode,
      this.S_AirportName,
      this.S_City,
      this.S_Country
    )
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.Airports = res.data;
          //console.log(this.Requests);
        }
        else {
          console.log(res);
        }
        this.loadingAirports = false;
      })
  }

}
