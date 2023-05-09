import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-flightware',
  templateUrl: './flightware.component.html',
  styleUrls: ['./flightware.component.scss']
})
export class FlightwareComponent {

  url = 'https://flightaware.com/';

  safeURL:any;

  constructor(private sanitizer: DomSanitizer) {
    this.safeURL = this.GetSafeUrl();
    
  }

  GetSafeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
