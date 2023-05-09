import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  // Global Variables 
  public sidebarToggled = false;


  OpenFlightAware()
  {
    window.open("https://flightaware.com/", '_blank', 'height=500,width=900');
  }






  // DOM Manipulation 
  // Method to Toggle Side bar
  public toggleSidebar(): void {
    this.sidebarToggled = !this.sidebarToggled;
  }
  
}
