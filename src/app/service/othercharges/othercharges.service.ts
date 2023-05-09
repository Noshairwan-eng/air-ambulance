import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherchargesService {

  URL = Connection.baseUrl + "othercharges/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveOtherCharges
    (
      RequestID: string,
      OtherChargesID: string,
      ChargeName: string,
      Amount: string
    ) {

    var url = "";
    var formData = new FormData();
    try {
      if (OtherChargesID != undefined && OtherChargesID !== "") {
        formData.append("uid", OtherChargesID);
        url = this.URL + "update.php";
      }
      else {
        url = this.URL + "add.php";
      }  
     
      formData.append("request_id", RequestID);
      formData.append("ChargeName", ChargeName);
      formData.append("Amount", Amount);
      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }


    return this.http.post<any>(url, formData);


  }

  FetchOtherCharges(RequestID: string) {
    let url = this.URL + "get.php?" + "request_id=" + RequestID + "&token=" + this.token.GetTokenObject().token;
    console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteOtherCharges(OtherChargesID:string)
  {
    let url = this.URL + "delete.php?" + "uid=" + OtherChargesID + "&token=" + this.token.GetTokenObject().token;    
    console.log(url);
    return this.http.get<any>(url);
  }
  

}

