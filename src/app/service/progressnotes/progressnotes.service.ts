import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgressnotesService {

  URL = Connection.baseUrl + "progressnotes/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveProgressNote
    (
      RequestID: string,
      ProgressNotesID:string,
      Description: string
    ) {

    var url = "";
    var formData = new FormData();
    try {
      if (ProgressNotesID != undefined && ProgressNotesID !== "") {
        formData.append("uid", ProgressNotesID);
        url = this.URL + "update.php";
      }
      else {
        url = this.URL + "add.php";
      }

      
      formData.append("request_id", RequestID);
      formData.append("Description", Description);
      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }
    //console.log("URL",url);

    return this.http.post<any>(url, formData);


  }

  FetchProgressNotes(RequestID: string) {
    let url = this.URL + "get.php?" + "request_id=" + RequestID + "&token=" + this.token.GetTokenObject().token;
    console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteProgressNotes(OtherChargesID: string) {
    let url = this.URL + "delete.php?" + "uid=" + OtherChargesID + "&token=" + this.token.GetTokenObject().token;
    console.log(url);
    return this.http.get<any>(url);
  }


}


