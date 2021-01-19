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
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
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

  @Input() element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('onInit called');
    console.log('Text content ' + this.header.nativeElement.textContent)
    console.log('Text paragraph ' + this.paragraph.nativeElement.textContent)
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
    console.log('Text paragraph ' + this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit called');
    console.log('Text content ' + this.header.nativeElement.textContent)
  }
  ngAfterViewChecked() {
    console.log('AfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('OnDestroy called');
  }

}
