import { Component } from '@angular/core';
import { OfferService } from 'src/app/service/offer/offer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {

  // Search Criteria Filters
  S_OfferID:string = "";
  S_ContactName:string = "";
  S_PatientName:string = "";
  S_PickUp:string = "";
  S_Depart:string = "";
  S_ContactNumber:string = "";
  S_Status:string = "";

  // Loading Flags
  loadingOffers: boolean = false;

  // Global Objects
  Offers: Array<any> = [];
  InvoieCreationError: string = "";

  constructor(
    private offerService: OfferService,
    private router: Router
  ) {
    
  }


  GetOffers() {

    this.loadingOffers = true;
    this.offerService.FetchOffers(
      this.S_OfferID,
      this.S_ContactName,
      this.S_PatientName,
      this.S_PickUp,
      this.S_Depart,
      this.S_ContactNumber,
      this.S_Status
    )
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.Offers = res.data;
          //console.log(this.Requests);
        }
        else {
          console.log(res);
        }
        this.loadingOffers = false;
      })
  }

  CreateInvoice(offer: any) {
    if (this.ValdateOfferData(offer)) {
      this.router.navigate(['/invoice'], { queryParams: { OfferID: offer.uid } });
    }
    else
    {
      Swal.fire("Invoice Errors", "There are some errors in offer please check log.", "error");

    }
  }

  ValdateOfferData(offer: any) {
    let flag = true;
    let tempOfferAmount = +offer.OfferAmount;
    if (tempOfferAmount <= 0) {
      flag = false;
      this.InvoieCreationError = "Offer Amount is less than 0."
    }
    

    console.error("Invoice Creation Error:", this.InvoieCreationError);


    return flag;

  }

}
