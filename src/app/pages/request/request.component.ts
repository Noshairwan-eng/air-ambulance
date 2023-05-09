import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request/request.service';
import Swal from 'sweetalert2';
import { AirlinecostService } from 'src/app/service/airlinecost/airlinecost.service';
import { OtherchargesService } from 'src/app/service/othercharges/othercharges.service';
import { EquipmentsService } from 'src/app/service/equipments/equipments.service';
import { ProgressnotesService } from 'src/app/service/progressnotes/progressnotes.service';
import { AirportService } from 'src/app/service/airport/airport.service';
declare var $: any;


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  // Show Tabs Flags
  showBasicInformation: boolean = true;
  showAirlineCost: boolean = false;
  showEquipments: boolean = false;
  showOtherCharges: boolean = false;
  showProgressNotes: boolean = false;
  showSummary: boolean = true;

  // Form Objects
  formSubmitted: boolean = false;
  airlineCostFormSubmitted: boolean = false;
  otherchargesFormSubmitted: boolean = false;
  equipmentsFormSubmitted: boolean = false;
  progressnotesFormSubmitted: boolean = false;
  emailSupplierFormSubmitted: boolean = false;

  RequestForm: FormGroup;
  AirLineCostForm: FormGroup;
  OtherChargesForm: FormGroup;
  EquipmentsForm: FormGroup;
  ProgressNotesForm: FormGroup;
  EmailSupplierForm: FormGroup;

  // Loading Flags
  loadingRequest: boolean = false;
  loadingAirLineCosts: boolean = false;
  loadingOtherCharges: boolean = false;
  loadingEquipments: boolean = false;
  loadingProgressNotes: boolean = false;
  loadingSave: boolean = false;
  loadingAirlineCostSave: boolean = false;
  loadingOtherChargesSave: boolean = false;
  loadingEquipmentsSave: boolean = false;
  loadingProgressNotesSave: boolean = false;
  loadingAirports: boolean = false;

  // Input Focus Flags
  IsFlyingFromFocused: boolean = false;
  IsFlyingToFocused: boolean = false;


  // Request ID
  RequestID: any = "";
  // Global Objects
  RequestDetail: any = {};
  AirLineCosts: Array<any> = [];
  CurrentAirLineCost: any = {};
  OtherCharges: Array<any> = [];
  CurrentOtherCharges: any = {};
  Equipments: Array<any> = [];
  CurrentEquipment: any = {};
  ProgressNotes: Array<any> = [];
  CurrentProgressNote: any = {};
  Airports: Array<any> = [];
  EmailSupplier:any = {};

  FilteredAirportsFrom: Array<any> = [];
  FilteredAirportsTo: Array<any> = [];

  TotalAirlineCost = 0.00;
  TotalEquipmentCost = 0.00;
  TotalOtherCharges = 0.00;
  TotalAmount = 0.00;

  AirlineCostError: string = "";
  EquipmentCostError: string = "";
  OtherChargesError: string = "";




  constructor(
    private formBuidler: FormBuilder,
    private requestService: RequestService,
    private airlinecostService: AirlinecostService,
    private otherchargesService: OtherchargesService,
    private equipmentsService: EquipmentsService,
    private progressnotesService: ProgressnotesService,
    private airportService: AirportService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.GetAirports();
    this.requestService
    this.RequestID = this.route.snapshot.paramMap.get("id");
    if (this.RequestID !== null && this.RequestID !== "") {
      this.GetRequestDetail();
      this.GetRequestAirLineCosts();
      this.GetEquipments();
      this.GetOtherCharges();
      this.GetProgressNotes();
    }
    else {
      this.RequestID = "";
    }

  }

  ngOnInit() {
    this.InitCurrentAirLineCost();
    this.InitCurrentOtherCharges();
    this.buildForm();
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      const formControlName = (event.target as HTMLInputElement).getAttribute('formcontrolname');
      if (formControlName === 'FlyingFrom') {
        this.IsFlyingFromFocused = true;
      }
      else if (formControlName === 'FlyingTo') {
        this.IsFlyingToFocused = true;
      }
      else {
        this.IsFlyingFromFocused = false;
        this.IsFlyingToFocused = false;
      }
    }
  }
  //#region Request Methods
  GetRequestDetail() {
    this.requestService.FetchRequestDetail(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data.length > 0) {
            this.RequestDetail = res.data[0];
          }
        }
        else {
          Swal.fire("Error Occured", "Error occured while fetching Request Detail.", "error");
          console.log(res);
        }
      })

  }
  SaveRequest() {
    this.formSubmitted = true;
    if (this.RequestForm.valid) {

      this.loadingSave = true;

      var tempFormData = this.RequestForm.value;
      this.requestService.SaveRequest
        (
          this.RequestID,
          tempFormData.ServiceType,
          tempFormData.FlyingFrom,
          tempFormData.FlyingTo,
          tempFormData.CallerName,
          tempFormData.CallerFax,
          tempFormData.CallerEmail,
          tempFormData.CallerPhone,
          tempFormData.CallerRelation,
          tempFormData.PatientName,
          tempFormData.PatientAge,
          tempFormData.PatientWeight,
          tempFormData.NoOfPassengers,
          tempFormData.MedicalBriefing,
          tempFormData.ReasonForTransport,
          tempFormData.ReferredBy
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            console.log(res);
            var InsertedID = res.data;

            Swal.fire("Request Saved", "Request data saved succcessfully.", "success");
            if (this.RequestID == "" || this.RequestID == null) {
              this.router.navigate(['request', InsertedID]);
            }
            else {
              this.GetRequestDetail();
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
  //#endregion

  //#region Air Line Cost Methods

  GetRequestAirLineCosts() {
    this.loadingOtherCharges = true;
    this.airlinecostService.FetchAirLineCosts(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data.length > 0) {
            this.AirLineCosts = res.data;
          }
        }
        else {
          console.log(res);
        }
        this.loadingOtherCharges = false;
      })
  }

  AddAirLineCost() {
    this.InitCurrentAirLineCost();
    this.showAirLineCostModal();
  }
  EditAirLineCost(airlineCost: any) {
    this.CurrentAirLineCost = airlineCost;
    this.showAirLineCostModal()
  }

  DeleteAirLineCost(airlineCost: any) {
    Swal.fire({
      title: 'Delete Airline Cost',
      text: "Are you sure you want to delete air line cost?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.DeleteAirLineCostConfirm(airlineCost);
      }
    })

  }

  DeleteAirLineCostConfirm(airlineCost: any) {
    this.airlinecostService.DeleteAirLineCost(airlineCost.uid)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.GetRequestAirLineCosts();
          this.hideAirLineCostModal();
        }
      })

  }
  SelectAirLineCost(airlineCost: any) {
    this.airlinecostService.SelectAirLineCost(airlineCost.uid, airlineCost.request_id)
      .subscribe((res: any) => {
        if (res.status == "success") {
          Swal.fire("Selection Modified", "Air Line cost selection modified successfully.", "success");
          this.GetRequestAirLineCosts();
        }
      })

  }
  SaveAirLineCost() {

    this.airlineCostFormSubmitted = true;
    if (this.AirLineCostForm.valid) {

      this.loadingAirlineCostSave = true;

      var tempFormData = this.AirLineCostForm.value;
      this.airlinecostService.SaveAirlineCost
        (
          this.RequestID,
          this.CurrentAirLineCost.uid,
          tempFormData.CompanyName,
          tempFormData.AirCraft,
          tempFormData.FT,
          tempFormData.STP,
          tempFormData.Comments,
          tempFormData.Price,
          tempFormData.SellFor
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            Swal.fire("Cost Saved", "Air Line cost saved successfully.", "success");
            this.hideAirLineCostModal();
            this.GetRequestAirLineCosts();

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

  InitCurrentAirLineCost() {
    this.CurrentAirLineCost = {
      uid: "",
      CompanyName: "",
      AirCraft: "",
      FT: "",
      STP: "",
      Comments: "",
      Price: "",
      SellFor: "",
      Selected: "0"

    }
  }

  //#endregion 


  //#region Equipments Methods
  GetEquipments() {
    this.loadingEquipments = true;
    this.equipmentsService.FetchEquipments(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data.length > 0) {
            this.Equipments = res.data;
          }
        }
        else {
          console.log(res);
        }
        this.loadingEquipments = false;
      })
  }

  AddEquipments() {
    this.InitEquipments();
    this.showEquipmentsModal();
  }

  EditEquipment(equpments: any) {
    this.CurrentEquipment = equpments;
    this.showEquipmentsModal();
  }
  SaveEquipments() {

    this.equipmentsFormSubmitted = true;
    if (this.EquipmentsForm.valid) {

      this.loadingEquipmentsSave = true;

      var tempFormData = this.EquipmentsForm.value;
      this.equipmentsService.SaveEquipment
        (
          this.RequestID,
          this.CurrentEquipment.uid,
          tempFormData.EquipmentName,
          tempFormData.Quantity,
          tempFormData.Cost

        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            //Swal.fire("Charges Saved", "Charges saved successfully against request.", "success");
            this.hideEquipmentsModal();
            this.GetEquipments();

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

  DeleteEquipment(equipment: any) {
    this.DeleteEquipmentConfirm(equipment);
  }

  DeleteEquipmentConfirm(equipment: any) {
    this.equipmentsService.DeleteEquipment(equipment.uid)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.GetEquipments();
          this.hideEquipmentsModal();
        }
      })

  }

  InitEquipments() {
    this.CurrentEquipment = {
      uid: "",
      EquipmentName: "",
      Quantity: "",
      Cost: ""
    }
  }
  //#endregion

  //#region Progress Notes Methods
  GetProgressNotes() {
    this.loadingProgressNotes = true;
    this.progressnotesService.FetchProgressNotes(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data.length > 0) {
            this.ProgressNotes = res.data;
          }
        }
        else {
          console.log(res);
        }
        this.loadingProgressNotes = false;
      })
  }

  AddProgressNotes() {
    this.InitProgressNotes();
    this.showProgressNotesModal();
  }

  EditProgressNotes(progressNotes: any) {
    this.CurrentProgressNote = progressNotes;
    this.showProgressNotesModal();
  }
  SaveProgressNotes() {

    this.progressnotesFormSubmitted = true;
    if (this.ProgressNotesForm.valid) {

      this.loadingProgressNotesSave = true;

      var tempFormData = this.ProgressNotesForm.value;
      this.progressnotesService.SaveProgressNote
        (
          this.RequestID,
          this.CurrentProgressNote.uid,
          tempFormData.Description
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            //Swal.fire("Charges Saved", "Charges saved successfully against request.", "success");
            this.hideProgressNotesModal();
            this.GetProgressNotes();

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

  DeleteProgressNotes(progressNotes: any) {
    this.DeleteProgressNotesConfirm(progressNotes);
  }

  DeleteProgressNotesConfirm(progressNotes: any) {
    this.progressnotesService.DeleteProgressNotes(progressNotes.uid)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.GetProgressNotes();
          this.hideProgressNotesModal();
        }
      })
  }

  InitProgressNotes() {
    this.CurrentProgressNote = {
      uid: "",
      Description: ""
    }
  }
  //#endregion


  //#region Other Chagres Methods
  GetOtherCharges() {
    this.loadingOtherCharges = true;
    this.otherchargesService.FetchOtherCharges(this.RequestID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data.length > 0) {
            this.OtherCharges = res.data;
          }
        }
        else {
          console.log(res);
        }
        this.loadingOtherCharges = false;
      })
  }

  AddOtherCharges() {
    this.InitCurrentOtherCharges();
    this.showOtherChagresModal();
  }

  EditOtherCharges(otherCharges: any) {
    this.CurrentOtherCharges = otherCharges;
    this.showOtherChagresModal();
  }
  SaveOtherCharges() {

    this.otherchargesFormSubmitted = true;
    if (this.OtherChargesForm.valid) {

      this.loadingOtherChargesSave = true;

      var tempFormData = this.OtherChargesForm.value;
      this.otherchargesService.SaveOtherCharges
        (
          this.RequestID,
          this.CurrentOtherCharges.uid,
          tempFormData.ChargeName,
          tempFormData.Amount
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            Swal.fire("Charges Saved", "Charges saved successfully against request.", "success");
            this.hideOtherChargesModal();
            this.GetOtherCharges();

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

  DeleteOtherCharges(otherCharges: any) {
    this.DeleteOtherChargesConfirm(otherCharges);
  }

  DeleteOtherChargesConfirm(otherCharges: any) {
    this.otherchargesService.DeleteOtherCharges(otherCharges.uid)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.GetOtherCharges();
          this.hideOtherChargesModal();
        }
      })

  }

  InitCurrentOtherCharges() {
    this.CurrentOtherCharges = {
      uid: "",
      ChargeName: "",
      Amount: ""
    }
  }
  //#endregion


  //#region Handling Aiports and Suggestions

  GetAirports(AirportName: string, ListType:string) {
    this.loadingAirports = true;

    //console.log("getting airports");
    this.airportService.FetchAirports("", "", "", AirportName, "", "")
      .subscribe((res: any) => {
        if (res.status == "success") {
          //this.Airports = res.data;
          if(ListType=="from")
          {
            this.FilteredAirportsFrom = res.data;
          }
          else if(ListType=="to")
          {
            this.FilteredAirportsTo = res.data;
          }
          console.log("fetched");
          //console.log(this.Airports);
        }
        else {
          console.log(res);
        }
        this.loadingAirports = false;
      })
  }

  SelectAirportFrom(airport: any) {
    this.RequestDetail.FlyingFrom = airport.AirportName;
    this.IsFlyingFromFocused = false;
  }
  SelectAirportTo(airport: any) {
    this.RequestDetail.FlyingTo = airport.AirportName;
    this.IsFlyingToFocused = false;
  }

  FlyingFromInputChange(event: any) {
    const inputValue = event.target.value;
    // this.FilteredAirportsFrom = this.Airports.filter((airport) => {
    //   return (
    //     airport.AirportName.toLowerCase().startsWith(inputValue.toLowerCase())
    //     ||
    //     airport.IATACode.toLowerCase().startsWith(inputValue.toLowerCase())
    //     ||
    //     airport.ICAOCode.toLowerCase().startsWith(inputValue.toLowerCase())
    //   );
    // });
    this.GetAirports(inputValue,"from");

  }
  FlyingToInputChange(event: any) {
    const inputValue = event.target.value;
    // this.FilteredAirportsTo = this.Airports.filter((airport) => {
    //   return (
    //     airport.AirportName.toLowerCase().startsWith(inputValue.toLowerCase())
    //     ||
    //     airport.IATACode.toLowerCase().startsWith(inputValue.toLowerCase())
    //     ||
    //     airport.ICAOCode.toLowerCase().startsWith(inputValue.toLowerCase())
    //   );
    // });
    this.GetAirports(inputValue,"to");
  }
  //#endregion



  //#region Form Building
  buildForm() {
    // Builing Request Form
    this.RequestForm = this.formBuidler.group({
      ServiceType: [null, Validators.required],
      FlyingFrom: [null, Validators.required],
      FlyingTo: [null, Validators.required],
      CallerName: [null, Validators.required],
      CallerFax: [null, null],
      CallerEmail: [null, Validators.required],
      CallerPhone: [null, Validators.required],
      CallerRelation: [null, Validators.required],
      PatientName: [null, Validators.required],
      PatientAge: [null, Validators.required],
      PatientWeight: [null, Validators.required],
      NoOfPassengers: [null, Validators.required],
      MedicalBriefing: [null, null],
      ReasonForTransport: [null, null],
      ReferredBy: [null, null]
    });
    // Building Air Line Cost Form
    this.AirLineCostForm = this.formBuidler.group({
      CompanyName: [null, Validators.required],
      AirCraft: [null, Validators.required],
      FT: [null, Validators.required],
      STP: [null, Validators.required],
      Comments: [null, null],
      Price: [null, Validators.required],
      SellFor: [null, Validators.required]
    })
    // Building Other Charges Form
    this.OtherChargesForm = this.formBuidler.group({
      ChargeName: [null, Validators.required],
      Amount: [null, Validators.required]
    });
    // Building Equipments Form
    this.EquipmentsForm = this.formBuidler.group({
      EquipmentName: [null, Validators.required],
      Quantity: [null, Validators.required],
      Cost: [null, Validators.required]
    });
    this.ProgressNotesForm = this.formBuidler.group({
      Description: [null, Validators.required]
    });

    

    this.EmailSupplierForm = this.formBuidler.group({
      EmailTo: [null, Validators.required],
      FlyingFrom: [null, Validators.required],
      FlyingTo: [null, Validators.required],
      EmailBody: [null, Validators.required]
    })

  }
  //#endregion


  SelectCard(cardName: string) {
    this.ResetCardSelection();
    switch (cardName) {
      case 'basicInformation':
        this.showBasicInformation = true;
        break;
      case 'airlineCost':
        this.showAirlineCost = true;
        break;
      case 'equipments':
        this.showEquipments = true;
        break;
      case 'otherCharges':
        this.showOtherCharges = true;
        break;
      case 'progressNotes':
        this.showProgressNotes = true;
        break;
      case 'summary':
        this.showSummary = true;
        break;
    }
  }

  CalculateTotals() {

    this.AirlineCostError = "";

    // Calculating Total Air Line Cost
    this.TotalAirlineCost = +this.AirLineCosts.filter(cost => cost.Selected === 1).map(cost => cost.SellFor);
    //this.TotalAirlineCost = parseFloat(this.TotalAirlineCost.toFixed(2));
    // Calculating Total Equipment Cost
    if (this.Equipments.length > 0) {
      this.TotalEquipmentCost = this.Equipments.map(a => a.Cost).reduce(function (a, b) {
        let tempA = +a;
        let tempB = +b;
        return tempA + tempB;
      });
    }
    //this.TotalEquipmentCost = parseFloat(this.TotalEquipmentCost.toFixed(2));
    // Calculating Total other Charges Cost
    if (this.OtherCharges.length > 0) {
      this.TotalOtherCharges = this.OtherCharges.map(a => a.Amount).reduce(function (a, b) {
        let tempA = +a;
        let tempB = +b;
        return tempA + tempB;
      });
    }
    //this.TotalOtherCharges = parseFloat(this.TotalOtherCharges.toFixed(2));
    // Calculating Total Amount 
    this.TotalAmount = (+this.TotalAirlineCost) + (+this.TotalEquipmentCost) + (+this.TotalOtherCharges);
    //this.TotalAmount = parseFloat(this.TotalAmount.toFixed(2));
  }

  CreateOffer() {

    var blnRequestValid = true;
    this.CalculateTotals();


    if (this.TotalAirlineCost <= 0) {
      this.AirlineCostError = "There is not airline cost selected."
      blnRequestValid = false;
    }
    if (this.TotalEquipmentCost <= 0) {
      this.EquipmentCostError = "There are no equipments added."
    }
    if (this.TotalOtherCharges <= 0) {
      this.OtherChargesError = "There are no other charges added."
    }

    if (blnRequestValid) {
      Swal.fire({
        title: 'Calculation Complete',
        text: "Do you want to create offer from this request?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, Create Offer!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/offer'], { queryParams: { RequestID: this.RequestID, CalculatedCost: this.TotalAmount } });
          //this.DeleteAirLineCostConfirm(airlineCost);
        }
      })
    }
  }

  ResetCardSelection() {
    this.showBasicInformation = false;
    this.showAirlineCost = false;
    this.showEquipments = false;
    this.showOtherCharges = false;
    this.showProgressNotes = false;
  }

  SendSupplierEmail()
  {

  }

  // Boostrap Modal Handling =========================
  showAirLineCostModal(): void {
    $("#airLineCostModal").modal('show');
  }
  hideAirLineCostModal(): void {
    var modalCloseButton = document.getElementById('airline-cost-close-modal');
    if (modalCloseButton != null) {
      modalCloseButton.click();
    }
  }
  showOtherChagresModal(): void {
    $("#otherChargesModal").modal('show');
  }
  hideOtherChargesModal(): void {
    var modalCloseButton = document.getElementById('other-charges-close-modal');
    if (modalCloseButton != null) {
      modalCloseButton.click();
    }
  }
  showEquipmentsModal(): void {
    $("#equipmentsModal").modal('show');
  }
  hideEquipmentsModal(): void {
    var modalCloseButton = document.getElementById('equipments-close-modal');
    if (modalCloseButton != null) {
      modalCloseButton.click();
    }
  }
  showProgressNotesModal(): void {
    $("#progressNotesModal").modal('show');
  }
  hideProgressNotesModal(): void {
    var modalCloseButton = document.getElementById('progress-notes-close-modal');
    if (modalCloseButton != null) {
      modalCloseButton.click();
    }
  }
  showEmailSupplierModal(): void {
    this.EmailSupplier.FlyingFrom = this.RequestDetail.FlyingFrom;
    this.EmailSupplier.FlyingTo = this.RequestDetail.FlyingTo;
    $("#emailSupplierModal").modal('show');
  }
  hideEmailSupplierModal(): void {
    var modalCloseButton = document.getElementById('email-supplier-close-modal');
    if (modalCloseButton != null) {
      modalCloseButton.click();
    }
  }



}
