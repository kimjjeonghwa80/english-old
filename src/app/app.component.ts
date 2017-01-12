import { Component } from '@angular/core';
@Component({
  selector: `app-component`,
  template: `
  <template ngbModalContainer></template>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  
  constructor() {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }
  
}
