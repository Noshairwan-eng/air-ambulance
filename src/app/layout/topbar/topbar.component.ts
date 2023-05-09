import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  UserObject:any={};

  constructor(private router: Router) { 
    this.GetUserInfo();
  }

  public LogOut() {
    localStorage.removeItem("USER");
    this.router.navigate(["login"]);
  }

  public GetUserInfo() {
    var UserString = localStorage.getItem("USER");
    if (UserString != "" && UserString != null) {
      this.UserObject = JSON.parse(UserString);
    }

  }

}
