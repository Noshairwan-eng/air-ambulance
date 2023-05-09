import { Component } from '@angular/core';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {

  // Search Criteria
  S_OfferID:string = "";

  // Loading Flags
  loadingInvoices: boolean = false;

  // Global Objects
  Invoices: Array<any> = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.GetInvoices();
  }


  GetInvoices() {
    this.loadingInvoices = true;
    this.invoiceService.FetchInvoices(this.S_OfferID)
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.Invoices = res.data;
          console.log(this.Invoices);
        }
        else {
          console.log(res);
        }
        this.loadingInvoices = false;
      })
  }

  CreateInvoice(invoice: any) {
    if (this.ValdateInvoiceData(invoice)) {

      this.router.navigate(['/invoice'], { queryParams: { InvoiceID: invoice.uid}});
      
      
    }
  }

  ValdateInvoiceData(invoice: any) {
    let flag = true;
    let tempInvoiceAmount = +invoice.InvoiceAmount;
    if (tempInvoiceAmount <= 0) {
      flag = false;
    }


    return flag;

  }

}