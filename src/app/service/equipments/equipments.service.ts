import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  URL = Connection.baseUrl + "equipments/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveEquipment
    (
      RequestID: string,
      EquipmentID: string,
      EquipmentName: string,
      Quantity: string,
      Cost: string
    ) {

    var url = "";
    var formData = new FormData();
    try {
      if (EquipmentID != undefined && EquipmentID !== "") {
        formData.append("uid", EquipmentID);
        url = this.URL + "update.php";
      }
      else {
        url = this.URL + "add.php";
      }  
     
      console.log(RequestID);
      formData.append("request_id", RequestID);
      formData.append("EquipmentName", EquipmentName);
      formData.append("Quantity", Quantity);
      formData.append("Cost", Cost);
      formData.append("token", this.token.GetTokenObject().token);
    }
    catch (e) {
      console.log(e);
    }

    console.log("URL", url);

    return this.http.post<any>(url, formData);


  }

  FetchEquipments(RequestID: string) {
    let url = this.URL + "get.php?" + "request_id=" + RequestID + "&token=" + this.token.GetTokenObject().token;
    //console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteEquipment(EquipmentID:string)
  {
    let url = this.URL + "delete.php?" + "uid=" + EquipmentID + "&token=" + this.token.GetTokenObject().token;    
    //console.log(url);
    return this.http.get<any>(url);
  }
  

}
