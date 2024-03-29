import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    // clickToClose: true,
    // clickIconToClose: true,
    position: ["top", "right"]
  }
}
