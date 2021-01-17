import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  DoCheck,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // If you now define any styles to this component in the CSS file
  // of this component, they will actually get applied globally
  // encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent
  implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  // @Input() element: { type: string, name: string, content: string };
  @Input() name: string;

  constructor() {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('onInit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`onChanges called`);
    console.log(changes);
  }

  ngDoCheck() {
    console.log('DoCheck called');
  }

  ngAfterContentInit() {
    console.log('afterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit called');
  }
  ngAfterViewChecked() {
    console.log('AfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('OnDestroy called');
  }

}
