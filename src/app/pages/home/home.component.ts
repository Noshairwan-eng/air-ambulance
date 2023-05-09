import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // Global Variables 
  DashboardData: any = {};

  // Loading Flags
  loadingDashboardData:boolean = false;

  constructor(
    private adminService: AdminService
  ) {
    this.GetDashboardData();

  }


  GetDashboardData() {
    this.loadingDashboardData = true;
    this.adminService.FetchDashboardData()
      .subscribe((res: any) => {
          if(res.status=="success")
          {
            if(res.data.length>0)
            {
              this.DashboardData = res.data[0];
            }
            else
            {
              console.log(res);
            }
          }
          else
          {
            console.log(res);
          }
          this.loadingDashboardData = false;
      })
  }

}
