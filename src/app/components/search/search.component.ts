import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() searchEvent = new EventEmitter<{ searchTerm: string }>();

  onSubmit() {
    const searchParams = { searchTerm: this.searchTerm };
    this.searchEvent.emit(searchParams);
  }

}
