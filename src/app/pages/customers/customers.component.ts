import { Component } from '@angular/core';
import { RequestService } from 'src/app/service/request/request.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  // Search Criteria
  S_ServiceType:string = "";
  S_FlyingFrom:string = "";
  S_FlyingTo:string = "";
  S_PatientName:string = "";
  S_CallerName:string = "";
  S_CallerEmail:string = "";
  S_CallerPhone:string = "";
  S_Status:string = "";

   // Loading Flags
   loadingRequests: boolean = false;

   // Global Objects
   Requests:Array<any> = [];

   constructor(
     private requestService: RequestService
   )
   {
     this.GetRequests();

   }


   GetRequests()
   {

    // Getting Search Criteria

     this.loadingRequests = true;
     this.requestService.FetchRequests(
       this.S_ServiceType,
       this.S_FlyingFrom,
       this.S_FlyingTo,
       this.S_PatientName,
       this.S_CallerName,
       this.S_CallerEmail,
       this.S_CallerPhone,
       this.S_Status
     )
     .subscribe((res:any)=>{
        if(res.status=="success")
        {
          this.Requests = res.data;
          //console.log(this.Requests);
        }
        else{
          console.log(res);
        }
        this.loadingRequests = false;
     })
   }


}
