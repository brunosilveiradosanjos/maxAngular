import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverInput.value,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint(serverInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverInput.value,
      serverContent: this.newServerContent
    });
  }
}
