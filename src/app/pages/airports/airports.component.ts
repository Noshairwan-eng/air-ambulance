import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { airportdata } from 'src/app/common/airportdata/airportdata';
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
  S_Identity:string = "";
  S_AirportName:string = "";  
  S_IATACode:string = "";
  
  // Loading Flags
  loadingAirports: boolean = false;

  // Global Objects
  Airports: Array<any> = [];
  InvoieCreationError: string = "";

  constructor(
    private airportService: AirportService,
    private router: Router
  ) {
    this.Airports = airportdata.Airports;    
  }


  GetAirports() {

  //  alert(this.S_AirportName);
  
    this.loadingAirports = true;
    this.airportService.FetchAirports(
      this.S_AirportID,
      this.S_Identity,
      this.S_IATACode,
      this.S_AirportName    
    )
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.Airports = res.data;
          airportdata.Airports = this.Airports;
          airportdata.FetchStatus = 2;          
        }
        else {
          console.log(res);
        }
        this.loadingAirports = false;
      })
  }

}
