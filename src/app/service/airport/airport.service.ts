import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportService  {

  URL = Connection.baseUrl + "airportdata/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveAirport
    (
      uid: string,
      request_id: string,
      ContactName: string,
      ContactNumber: string,
      PatientName: string,
      AirCraft: string,
      Crew: string,
      Duration: string,
      ItineraryDate: string,
      PickUp: string,
      Depart: string,
      GroundCharges1: string,
      GroundCharges2: string,
      AirportAmount: string
    ) {

    var url = "";
    var formData = new FormData();
    try {
      if (uid != undefined && uid !== "") {
        formData.append("uid", uid);
        url = this.URL + "update.php";
      }
      else {
        url = this.URL + "add.php";
      }

      formData.append("request_id", request_id);
      formData.append("ContactName", ContactName);
      formData.append("PatientName", PatientName);
      formData.append("ContactNumber", ContactNumber);
      formData.append("AirCraft", AirCraft);
      formData.append("Crew", Crew);
      formData.append("Duration", Duration);
      formData.append("ItineraryDate", ItineraryDate);
      formData.append("PickUp", PickUp);
      formData.append("Depart", Depart);
      formData.append("GroundCharges1", GroundCharges1);
      formData.append("GroundCharges2", GroundCharges2);
      formData.append("AirportAmount", AirportAmount);



      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }

    console.log(url);

    return this.http.post<any>(url, formData);


  }

  FetchAirports(
    AirportID: string,
    ICAOCode: string,
    IATACode: string,
    AirportName: string,
    City: string,
    Country: string    
  ) {
    let url = this.URL + "get.php?";
    url = url + "token=" + this.token.GetTokenObject().token + "&";
    url = url + "uid=" + AirportID + "&";
    url = url + "ICAOCode=" + ICAOCode + "&";
    url = url + "IATACode=" + IATACode + "&";
    url = url + "AirportName=" + AirportName + "&";
    url = url + "City=" + City + "&";
    url = url + "Country=" + Country;

    console.log("URL", url);
    return this.http.get<any>(url);
  }

  FetchAirportDetail(AirportID: string) {
    let url = this.URL + "get.php?" + "uid=" + AirportID + "&token=" + this.token.GetTokenObject().token;
    //console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteAirport(AirportID: string) {
    let url = this.URL + "delete.php?" + "uid=" + AirportID + "&token=" + this.token.GetTokenObject().token;
    console.log(url);
    return this.http.get<any>(url);
  }

 
}
