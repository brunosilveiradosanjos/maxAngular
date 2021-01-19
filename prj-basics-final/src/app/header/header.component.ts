import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() pathSelected = new EventEmitter<string>();

  onSelect(path: string) {
    // receive path from header and emit it to app.component
    this.pathSelected.emit(path);
    console.log(path)
  }

}
