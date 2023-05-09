import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-airport-suggestion',
  templateUrl: './airport-suggestion.component.html',
  styleUrls: ['./airport-suggestion.component.scss']
})
export class AirportSuggestionComponent {

  @Input() filteredAirports:Array<any>=[];

  @Output() AirportSelected = new EventEmitter<any>();


  SelectAirport(airport:any)
  {
    this.AirportSelected.emit(airport);
  }

}
