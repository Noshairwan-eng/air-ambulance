import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/service/offer/offer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  // Form Objects
  formSubmitted: boolean = false;
  InvoiceForm: FormGroup;

  // Global Objects
  InvoiceID: any;
  OfferID: any;
  Invoice: any = {};
  Offer:any = {};

  // Loading Flags 
  loadingSave: boolean = false;

  ngOnInit() {
    this.buildForm();
    this.InitInvoiceObject();
    this.InitOfferObject();
  }

  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private offerService: OfferService
    )
  {
    this.InvoiceID = this.route.snapshot.paramMap.get("id");
    if (this.InvoiceID !== null && this.InvoiceID !== "") {

      this.GetInvoiceDetail();

    }
    else {
      this.OfferID = "";
      this.route.queryParams.subscribe((params: any) => {
        this.OfferID = params['OfferID'];        
      });

      if (this.OfferID != null && this.OfferID != undefined && this.OfferID != "") {
        this.PopulateOfferData();
      }
      else {
        this.router.navigate(["/offers"])
      }
    }
    
  }

  SaveInvoice() {
    this.formSubmitted = true;
    if (this.InvoiceForm.valid) {

      this.loadingSave = true;

      var tempFormData = this.InvoiceForm.value;

      var _InvoiceAmount = this.Offer.OfferAmount;

      this.invoiceService.SaveInvoice
        (
          this.InvoiceID,
          this.OfferID,
          tempFormData.PaymentMethod,
          _InvoiceAmount,
          
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            //console.log(res);
            var InsertedID = res.data;

            Swal.fire("Invoice Saved", "Invoice data saved succcessfully.", "success");

            if (this.InvoiceID == "" || this.InvoiceID == null) {
              this.router.navigate(['invoice', InsertedID]);
            }
            else {
              this.InvoiceForm.reset();
              this.GetInvoiceDetail();
            }
          }
          else {
            //this.LoginError = res.error;
            console.log(res);
            Swal.fire("Process Failed", res.error, "error");
          }
          this.loadingSave = false;
          this.formSubmitted = false;
        });
    }
  }

  GetInvoiceDetail()
  {
    this.invoiceService.FetchInvoiceDetail(this.InvoiceID)
    .subscribe((res:any)=>{
      if(res.status=="success")
      {
        if(res.data.length>0)
        {
          this.Invoice = res.data[0];
        }
      }
      else
      {
        console.log(res);
      }

    })

  }

  PopulateOfferData()
  {
    this.offerService.FetchOfferDetail(this.OfferID)
    .subscribe((res:any)=>{
      if(res.status=="success")
      {
        if(res.data.length>0)
        {
          this.Offer = res.data[0];
          this.Invoice.InvoiceAmount = this.Offer.OfferAmount;
          // Checking if the request is already converted to offer
          
          if (this.Offer.Status != "0") {
            Swal.fire("Invoice Created Already", "This offer is already converted an invoice.", "warning");
            this.router.navigate(["/offers/"]);
          }
        }
      }
      else
      {
        console.log(res);
      }

    })

  }




  InitInvoiceObject() {

    this.Invoice = {
      uid: "",
      PaymentMethod: "",
      InvoiceAmount: "",
      Status: ""
    }    
  }
  InitOfferObject() {
    this.Offer = {
      uid: "",
      request_id: "",
      offer_id: "",
      ContactName: "",
      PatientName: "",
      ContactNumber: "",
      AirCraft: "",
      Crew: "",
      Duration: "",
      ItineraryDate: "",
      PickUp: "",
      Depart: "",
      GroundCharges1: "",
      GroundCharges2: "",
      CalculatedAmount: "",
      OfferAmount: "",
      Status: ""
    }
  }


  buildForm() {
    this.InvoiceForm = this.formBuidler.group({
      PaymentMethod:[null, Validators.required],
      InvoiceAmount:[null, Validators.required]
    })
  }

}
