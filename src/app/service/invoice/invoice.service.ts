import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  URL = Connection.baseUrl + "invoice/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  SaveInvoice
    (
      uid: string,
      offer_id: string,
      PaymentMethod: string,
      InvoiceAmount: string      
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

      formData.append("offer_id", offer_id);
      formData.append("PaymentMethod", PaymentMethod);
      formData.append("InvoiceAmount", InvoiceAmount);    
      formData.append("token", this.token.GetTokenObject().token);

    }
    catch (e) {
      console.log(e);
    }

    console.log(url);

    return this.http.post<any>(url, formData);


  }

  FetchInvoices(OfferID:string) {

    let url = this.URL + "get.php?";
    url = url + "token="+this.token.GetTokenObject().token + "&";
    url = url + "OfferID="+OfferID;
    console.log("URL", url);
    return this.http.get<any>(url);
  }

  FetchInvoiceDetail(InvoiceID: string) {
    let url = this.URL + "get.php?" + "uid=" + InvoiceID + "&token=" + this.token.GetTokenObject().token;
    //console.log("URL", url);
    return this.http.get<any>(url);
  }

  DeleteInvoice(InvoiceID: string) {
    let url = this.URL + "delete.php?" + "uid=" + InvoiceID + "&token=" + this.token.GetTokenObject().token;
    console.log(url);
    return this.http.get<any>(url);
  }


}

