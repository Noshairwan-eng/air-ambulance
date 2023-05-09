import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  URL = Connection.baseUrl + "supplier/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveSupplier
    (
      uid: string,
      SupplierName: string,
      Email:string,
      Phone:string,
      Address:string,
      ChargePerMile: string,
      Status: string
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


      formData.append("SupplierName", SupplierName);
      formData.append("Email", Email);
      formData.append("Phone", Phone);
      formData.append("Address", Address);
      formData.append("ChargePerMile", ChargePerMile);
      formData.append("Status", Status);
      formData.append("token", this.token.GetTokenObject().token);

    }
    catch (e) {
      console.log(e);
    }

    console.log(url);

    return this.http.post<any>(url, formData);


  }

  FetchSuppliers(SupplierID: string, SupplierName: string, Status:string) {

    let url = this.URL + "get.php?";
    url = url + "token=" + this.token.GetTokenObject().token + "&";
    url = url + "SupplierID=" + SupplierID + "&";
    url = url + "SupplierName=" + SupplierName + "&";
    url = url + "Status=" + Status;
    console.log("URL", url);
    return this.http.get<any>(url);
  }

  FetchSupplierDetail(SupplierID: string) {
    let url = this.URL + "get.php?" + "uid=" + SupplierID + "&token=" + this.token.GetTokenObject().token;
    console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteSupplier(SupplierID: string) {
    let url = this.URL + "delete.php?" + "uid=" + SupplierID + "&token=" + this.token.GetTokenObject().token;
    console.log(url);
    return this.http.get<any>(url);
  }


}

