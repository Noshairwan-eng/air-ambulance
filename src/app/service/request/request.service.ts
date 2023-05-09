import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  URL = Connection.baseUrl + "request/";
  token: Token;

  constructor(private http: HttpClient) {
    this.token = new Token();
  }

  FetchRequests(
    ServiceType: string,
    FlyingFrom: string,
    FlyingTo: string,
    PatientName: string,
    CallerName: string,
    CallerEmail: string,
    CallerPhone: string,
    Status: string,
  ) {
    let url = this.URL + "get.php?";

    url = url + "token=" + this.token.GetTokenObject().token + "&";
    // Attaching Search Params
    url = url + "ServiceType=" + ServiceType + "&";
    url = url + "FlyingFrom=" + FlyingFrom + "&";
    url = url + "FlyingTo=" + FlyingTo + "&";
    url = url + "PatientName=" + PatientName + "&";
    url = url + "CallerName=" + CallerName + "&";
    url = url + "CallerEmail=" + CallerEmail + "&";
    url = url + "CallerPhone=" + CallerPhone + "&";
    url = url + "Status=" + Status;


    //console.log("URL",url);
    return this.http.get<any>(url);
  }

  SaveRequest
    (
      RequestID: string,
      ServiceType: string,
      FlyingFrom: string,
      FlyingTo: string,
      CallerName: string,
      CallerFax: string,
      CallerEmail: string,
      CallerPhone: string,
      CallerRelation: string,
      PatientName: string,
      PatientAge: string,
      PatientWeight: string,
      NoOfPassengers: string,
      MedicalBriefing: string,
      ReasonForTransport: string,
      ReferredBy: string
    ) {

    var url = "";
    var formData = new FormData();

    if (RequestID !== "") {
      formData.append("uid", RequestID);
      url = this.URL + "update.php";
    }
    else {
      url = this.URL + "add.php";
    }

    formData.append("ServiceType", ServiceType);
    formData.append("FlyingFrom", FlyingFrom);
    formData.append("FlyingTo", FlyingTo);
    formData.append("CallerName", CallerName);
    formData.append("CallerFax", CallerFax);
    formData.append("CallerEmail", CallerEmail);
    formData.append("CallerPhone", CallerPhone);
    formData.append("CallerRelation", CallerRelation);
    formData.append("PatientName", PatientName);
    formData.append("PatientAge", PatientAge);
    formData.append("PatientWeight", PatientWeight);
    formData.append("NoOfPassengers", NoOfPassengers);
    formData.append("MedicalBriefing", MedicalBriefing);
    formData.append("ReasonForTransport", ReasonForTransport);
    formData.append("ReferredBy", ReferredBy);



    formData.append("token", this.token.GetTokenObject().token);

    return this.http.post<any>(url, formData);


  }

  FetchRequestDetail(RequestID: string) {
    let url = this.URL + "get.php?" + "uid=" + RequestID + "&token=" + this.token.GetTokenObject().token;
    //console.log("URL",url);
    return this.http.get<any>(url);
  }


  SendSupplierEmail(Email: string, FlyingFrom: string, FlyingTo: string, EmailBody: string) {
    let url = this.URL + "sendSupplierEmail.php?" + 
    "Email=" + Email + "&" +
    "FlyingFrom=" + FlyingFrom +  "&" +
    "FlyingTo=" + FlyingTo +  "&" +
    "EmailBody=" + EmailBody +  "&" +
    "token=" + this.token.GetTokenObject().token;

    console.log("URL",url);
    return this.http.get<any>(url);

  }

}
