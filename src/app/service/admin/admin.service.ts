import { Injectable } from '@angular/core';
import { Connection } from '../common/conn';
import { Token } from '../common/token';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  URL = Connection.baseUrl + "admin/";
  token:Token;
  
  constructor(private http: HttpClient) 
  { 
    this.token = new Token();    
  }

  FetchDashboardData()
  {
    return this.http.get<any>(this.URL + "getDashboardData.php");
  }

  LoginUser(username:string, password:string)
  {
    var formData =new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post<any>(this.URL + "login.php?",formData);
  } 
  

}