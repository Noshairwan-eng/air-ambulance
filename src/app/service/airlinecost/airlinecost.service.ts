import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlinecostService {

  URL = Connection.baseUrl + "airlinecost/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveAirlineCost
    (
      RequestID: string,
      AirLineCostID: string,
      CompanyName: string,
      AirCraft: string,
      FT: string,
      STP: string,
      Comments: string,
      Price: string,
      SellFor: string
    ) {

    var url = "";
    var formData = new FormData();
    try {
      if (AirLineCostID != undefined && AirLineCostID !== "") {
        formData.append("uid", AirLineCostID);
        url = this.URL + "update.php";
      }
      else {
        url = this.URL + "add.php";
      }  
     
      formData.append("request_id", RequestID);
      formData.append("CompanyName", CompanyName);
      formData.append("AirCraft", AirCraft);
      formData.append("FT", FT);
      formData.append("STP", STP);
      formData.append("Comments", Comments);
      formData.append("Price", Price);
      formData.append("SellFor", SellFor);
      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }


    return this.http.post<any>(url, formData);


  }

  FetchAirLineCosts(RequestID: string) {
    let url = this.URL + "get.php?" + "request_id=" + RequestID + "&token=" + this.token.GetTokenObject().token;
    //console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteAirLineCost(AirlineCostID:string)
  {
    let url = this.URL + "delete.php?" + "uid=" + AirlineCostID + "&token=" + this.token.GetTokenObject().token;    
    console.log(url);
    return this.http.get<any>(url);
  }
  SelectAirLineCost(AirlineCostID:string, RequestID:string)
  {
    let url = this.URL + "selectAirLineCost.php?" + "uid=" + AirlineCostID + "&request_id="+RequestID + "&token=" + this.token.GetTokenObject().token;    
    console.log(url);
    return this.http.get<any>(url);
  }

}