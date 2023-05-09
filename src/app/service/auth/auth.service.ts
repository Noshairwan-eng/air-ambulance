import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Connection } from '../common/conn';
import { Token } from '../common/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = Connection.baseUrl + "auth/";
  token:Token;
  
  constructor(private http: HttpClient) 
  { 
    this.token = new Token();    
  }

  LoginUser(username:string, password:string)
  {
    var formData =new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post<any>(this.URL + "login.php?",formData);
  } 
  

}