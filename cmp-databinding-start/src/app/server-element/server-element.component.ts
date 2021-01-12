import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // If you now define any styles to this component in the CSS file
  // of this component, they will actually get applied globally
  // encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit {

  @Input() element: { type: string, name: string, content: string };

  constructor() { }

  ngOnInit(): void {
  }

}
