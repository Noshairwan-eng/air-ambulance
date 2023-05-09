import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferdocumentsService {

  URL = Connection.baseUrl + "offerdocuments/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveOfferDocument
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
      OfferAmount: string
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
      formData.append("OfferAmount", OfferAmount);



      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }

    console.log(url);

    return this.http.post<any>(url, formData);


  }

  FetchOfferDocuments(
    offer_id: string
  ) {
    let url = this.URL + "get.php?";
    url = url + "token=" + this.token.GetTokenObject().token + "&";
    url = url + "offer_id=" + offer_id;    
    return this.http.get<any>(url);
  }

 

  DeleteOfferDocument(OfferID: string) {
    let url = this.URL + "delete.php?" + "uid=" + OfferID + "&token=" + this.token.GetTokenObject().token;
    //console.log(url);
    return this.http.get<any>(url);
  }
  
  UploadFile(offer_id: string, file: any) {

    var formData = new FormData();
    formData.append("offer_id", offer_id);
    formData.append("file", file);
    formData.append("token", this.token.GetTokenObject().token);

    console.log("URL", this.URL + "add.php");
    return this.http.post<any>(this.URL + "add.php", formData);
  }
}