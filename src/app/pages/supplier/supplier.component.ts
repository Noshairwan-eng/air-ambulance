import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { Connection } from 'src/app/service/common/conn';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {



  // Form Objects
  formSubmitted: boolean = false;
  SupplierForm: FormGroup;

  // Global Objects
  ServerUrl: string = "";
  SupplierID: any;
  Supplier: any = {};



  // Loading Flags
  loadingSupplier: boolean = false;
  loadingSave: boolean = false;



  constructor(
    private formBuidler: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
  ) {

    this.SupplierID = this.route.snapshot.paramMap.get("id");
    if (this.SupplierID !== null && this.SupplierID !== "") {

      this.GetSupplierDetail();
    }
    else {
    }

  }

  ngOnInit() {
    this.buildForm();
    this.InitSupplierObject();
    this.ServerUrl = Connection.serverUrl;
  }

  GetSupplierDetail() {

    this.loadingSupplier = true;

    this.supplierService.FetchSupplierDetail(this.SupplierID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data != undefined && res.data.length > 0)
            this.Supplier = res.data[0];
        }
        else {
          console.log(res);
        }
      });

  }

  SaveSupplier() {
    this.formSubmitted = true;
    if (this.SupplierForm.valid) {

      this.loadingSave = true;

      var tempFormData = this.SupplierForm.value;
      this.supplierService.SaveSupplier
        (
          this.SupplierID,
          tempFormData.SupplierName,
          tempFormData.Email,
          tempFormData.Phone,
          tempFormData.Address,
          tempFormData.ChargePerMile,
          "1"
        )
        .subscribe((res: any) => {
          if (res.status == "success") {

            //console.log(res);
            var InsertedID = res.data;

            Swal.fire("Supplier Saved", "Supplier data saved succcessfully.", "success");
            if (this.SupplierID == "" || this.SupplierID == null) {
              this.router.navigate(['supplier', InsertedID]);
            }
            else {
              this.SupplierForm.reset();
              this.GetSupplierDetail();
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
    this.supplierService.FetchSupplierDetail(this.SupplierID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          if (res.data != null && res.data != undefined && res.data.length > 0)
            this.Supplier = res.data[0];
        }
        else {
          console.log(res);
        }
      })
  }

  DeleteSupplier()
  {
    this.supplierService.DeleteSupplier(this.SupplierID)
    .subscribe((res:any)=>{
      if(res.status=="success")
      {
        Swal.fire("Supplier Deleted", "Supplier deleted succcessfully.", "success"); 
        this.router.navigate(["suppliers"]);
      }
      else
      {
        Swal.fire("Process Failed", "Error occured while saving supplier.", "error"); 
        console.log(res);
      }
    })
  }




  InitSupplierObject() {
    this.Supplier = {
      uid: "",
      SupplierName: "",
      ChargePerMile: "",
      Status: ""
    }
  }


  buildForm() {
    this.SupplierForm = this.formBuidler.group({
      SupplierName: [null, Validators.required],
      Email : [null, Validators.required],
      Phone : [null, Validators.required],
      Address: [null, Validators.required],
      ChargePerMile: [null, Validators.required]
    })
  }



}

