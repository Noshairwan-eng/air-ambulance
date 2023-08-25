import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  URL = Connection.baseUrl + "settings/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveSettings(uid: string,CostPerMile: string) {

    var url = "";
    url = this.URL + "update.php";
    var formData = new FormData();
    try {
      formData.append("uid", uid); 
      formData.append("CostPerMile", CostPerMile);      
      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }

    return this.http.post<any>(url, formData);


  }

  FetchSettings() {

    let url = this.URL + "get.php?";
    url = url + "token=" + this.token.GetTokenObject().token;   
    console.log("URL", url);
    return this.http.get<any>(url);

  }



}
