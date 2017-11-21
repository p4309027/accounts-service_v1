import { Component } from '@angular/core';
import { AppService } from "./app.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private authService: AppService) {}
    
        isLoggedIn() {
            return this.authService.isLoggedIn();
        }
}