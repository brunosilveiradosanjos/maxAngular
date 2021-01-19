import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // the application is started at recipe
  loadedFeature = 'recipe'

  onNavigate(path: string) {
    // update loadedFeature to change path
    this.loadedFeature = path;
  }
}
