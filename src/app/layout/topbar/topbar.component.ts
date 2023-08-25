import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { airportdata } from 'src/app/common/airportdata/airportdata';
import { AirportService } from 'src/app/service/airport/airport.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  UserObject: any = {};
  loadingAirports: boolean = false;

  constructor(private airportService: AirportService, private router: Router) {
    this.GetUserInfo();
  }

  ngOnInit(): void {
    
    // Checking if we need to fetch Airports Data
    if (airportdata.FetchStatus == 0) {
      this.GetAirports();
    }
  }

  public LogOut() {
    airportdata.Airports = [];
    airportdata.FetchStatus = 0;
    localStorage.removeItem("USER");
    this.router.navigate(["login"]);
  }

  public GetUserInfo() {
    var UserString = localStorage.getItem("USER");
    if (UserString != "" && UserString != null) {
      this.UserObject = JSON.parse(UserString);
    }
  }

  GetAirports() {
    console.log("TopBar: Loading Airports");
    this.loadingAirports = true;
    airportdata.FetchStatus = 1;     
    this.airportService.FetchAirports("", "", "", "")
      .subscribe((res: any) => {
        if (res.status == "success") {
          airportdata.Airports = res.data;
          airportdata.FetchStatus = 2;    
        }
        else {
          airportdata.FetchStatus = 0;
          console.log(res);
        }
        this.loadingAirports = false;
      })
  }

}
