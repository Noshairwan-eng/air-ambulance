import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request/request.service';
import { AirlinecostService } from 'src/app/service/airlinecost/airlinecost.service';
import Swal from 'sweetalert2';
import { OfferService } from 'src/app/service/offer/offer.service';
import { OfferdocumentsService } from 'src/app/service/offerdocuments/offerdocuments.service';
import { Connection } from 'src/app/service/common/conn';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  // File Handling Variables 
  SelectedFileData: any;
  SelectedFileName: string = "Choose File";

  // Form Objects
  formSubmitted: boolean = false;
  OfferForm: FormGroup;

  // Global Objects
  ServerUrl: string = "";
  OfferID: any;
  RequestID: any;
  OfferGeneratedID: string;
  OfferAmountError: string = "";
  CalculatedCost: any;
  Offer: any = {};
  Request: any = {};
  AirlineCosts: Array<any> = [];
  OfferDocuments: Array<any> = [];


  // Loading Flags
  loadingOffer: boolean = false;
  loadingSave: boolean = false;
  loadingFileUpload: boolean = false;



  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private airlineCostService: AirlinecostService,
    private offerService: OfferService,
    private offerDocumentsService: OfferdocumentsService
  ) {

    this.OfferID = this.route.snapshot.paramMap.get("id");
    if (this.OfferID !== null && this.OfferID !== "") {

      this.GetOfferDetail();
      this.GetOfferDocuments();

    }
    else {
      this.OfferID = "";
      this.route.queryParams.subscribe((params: any) => {
        this.RequestID = params['RequestID'];
        this.CalculatedCost = params['CalculatedCost'];
      });

      if (this.RequestID != null && this.RequestID != undefined && this.RequestID != "") {
        this.PopulateOfferData();
      }
      else {
        this.router.navigate(["/offers"])
      }
    }

  }

  ngOnInit() {
    this.buildForm();
    this.InitOfferObject();
    this.ServerUrl = Connection.serverUrl;
  }

  GetOfferDetail() {

    this.loadingOffer = true;

    this.offerService.FetchOfferDetail(this.OfferID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data != undefined && res.data.length > 0)
            this.Offer = res.data[0];
          // Generating Offer ID
          const creationDate = new Date(this.Offer.Creation);
          const year = creationDate.getFullYear();
          const month = creationDate.getMonth() + 1;
          const day = creationDate.getDate();

          const formattedDate = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;
          this.OfferGeneratedID = formattedDate.toString() + this.Offer.offer_alpha.toString();

        }
        else {
          console.log(res);
        }
      });

  }

  SaveOffer() {
    this.formSubmitted = true;
    if (this.OfferForm.valid) {

      this.loadingSave = true;

      var tempFormData = this.OfferForm.value;
      this.offerService.SaveOffer
        (
          this.OfferID,
          this.RequestID,
          tempFormData.ContactName,
          tempFormData.ContactNumber,
          tempFormData.PatientName,
          tempFormData.AirCraft,
          tempFormData.Crew,
          tempFormData.Duration,
          tempFormData.ItineraryDate,
          tempFormData.PickUp,
          tempFormData.Depart,
          tempFormData.GroundCharges1,
          tempFormData.GroundCharges2,
          tempFormData.OfferAmount
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            //console.log(res);
            var InsertedID = res.data;

            Swal.fire("Offer Saved", "Offer data saved succcessfully.", "success");
            if (this.OfferID == "" || this.OfferID == null) {
              this.router.navigate(['offer', InsertedID]);
            }
            else {
              this.OfferForm.reset();
              this.GetOfferDetail();
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

  GetRequestDetail() {
    this.requestService.FetchRequestDetail(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data != undefined && res.data.length > 0)
            this.Request = res.data[0];

          // Checking if the request is already converted to offer
          if (this.Request.Status != "0") {
            Swal.fire("Offer Created Already", "This request is already converted an offer.", "warning");
            this.router.navigate(["/request/" + this.RequestID]);
          }


          this.Offer.ContactName = this.Request.CallerName;
          this.Offer.ContactNumber = this.Request.CallerPhone;
          this.Offer.PatientName = this.Request.PatientName;
        }
        else {
          console.log(res);
        }
      })
  }
  GetAirlineCost() {
    this.airlineCostService.FetchAirLineCosts(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.AirlineCosts = res.data;

          this.Offer.AirCraft = this.AirlineCosts.filter(cost => cost.Selected === 1).map(cost => cost.AirCraft);

        }
        else {
          console.log(res);
        }
      })

  }

  CloseOffer()
  {
    Swal.fire({
      title: 'Close Offer',
      text: "Are you sure you want to Close this offer?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Close!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.offerService.CloseOffer(this.OfferID, "")
        .subscribe((res)=>{
          if(res.status=="success")
          {
            Swal.fire("Offer Closed", "Offer closed successfully", "success");
            this.GetOfferDetail();
          }
          else
          {
            Swal.fire("Proess Failed", res.error, "error");
          }

        })

      }
    })

  }
  async PopulateOfferData() {

    this.Request = null;

    await this.GetRequestDetail();
    await this.GetAirlineCost();

  }


  GetOfferDocuments() {
    this.offerDocumentsService.FetchOfferDocuments(this.OfferID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.OfferDocuments = res.data;
          console.log(this.OfferDocuments);
        }
        else {
          console.log(res);
        }
      })
  }
  DeleteOfferDocument(OfferDocumentID: string) {
    Swal.fire({
      title: 'Delete Document',
      text: "Are you sure you want to delete this document?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.offerDocumentsService.DeleteOfferDocument(OfferDocumentID)
          .subscribe((res: any) => {
            if (res.status == "success") {
              this.GetOfferDocuments();
              Swal.fire("Document Deleted", "Offer document deleted successfully.", "success");
            }
            else
            {
              Swal.fire("Process Failed", "Error occured while deleting offer document.", "error");
              console.log(res);
            }
          })

      }
    })



  }



  // File Handling ===================================
  FileInputChange(event: any) {
    if (event.target.files[0] != null) {
      this.SelectedFileData = event.target.files[0];
      if (this.SelectedFileData != null) {
        this.SelectedFileName = this.SelectedFileData.name;
      }

    }
  }

  UploadFile() {
    if (this.OfferID != "" && (this.SelectedFileData != null)) {
      this.offerDocumentsService.UploadFile(this.OfferID, this.SelectedFileData)
        .subscribe((res: any) => {
          if (res.status == "success") {
            Swal.fire("Item Added", "Item successfully added to work log.", "success");
            this.SelectedFileData = null;
            this.SelectedFileName = "Choose File";
            this.GetOfferDocuments();
          }
          else {
            Swal.fire("Process Failed", "Error occured while processing the request.", "error");
            console.log(res.error);
          }
        })
    }
    else {
      Swal.fire("Invalid Request", "Please make sure mandatory fields are filled.", "error");
    }

  }
  // ==================================================





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
    this.OfferForm = this.formBuidler.group({
      ContactName: [null, Validators.required],
      PatientName: [null, Validators.required],
      ContactNumber: [null, Validators.required],
      AirCraft: [null, Validators.required],
      Crew: [null, Validators.required],
      Duration: [null, Validators.required],
      ItineraryDate: [null, Validators.required],
      PickUp: [null, Validators.required],
      Depart: [null, Validators.required],
      GroundCharges1: [null, Validators.required],
      GroundCharges2: [null, Validators.required],
      OfferAmount: [null, Validators.required],
      CalculatedCost: [null, null]
    })
  }



}
