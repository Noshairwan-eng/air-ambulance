import { Component } from '@angular/core';
import { SupplierService } from 'src/app/service/supplier/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {

  // Search Criteria Filters
  S_SupplierName:string = "";
  S_Status:string = "";

  // Loading Flags
  loadingSuppliers: boolean = false;

  // Global Objects
  Suppliers: Array<any> = [];
  InvoieCreationError: string = "";

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {
    
  }


  GetSuppliers() {

    
    this.loadingSuppliers = true;
    this.supplierService.FetchSuppliers(
      "",
      this.S_SupplierName,
      this.S_Status
    )
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.Suppliers = res.data;
          //console.log(this.Requests);
        }
        else {
          console.log(res);
        }
        this.loadingSuppliers = false;
      })
  }



 
}

