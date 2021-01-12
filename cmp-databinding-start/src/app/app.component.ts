import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{ type: 'blueprint', name: 'Testserver', content: 'Just a test!' },
  { type: 'server', name: 'Testserver', content: 'Just a test!' },
  { type: 'server', name: 'Testserver', content: 'Just a test!' }];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.unshift({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.unshift({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }



}
