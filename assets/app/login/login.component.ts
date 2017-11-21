import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AppService } from "../app.service";
import {ErrorService} from "../errors/error.service";
import { User} from "../user/user.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    myForm: FormGroup;

    constructor(private authService: AppService, private router: Router, private errorService: ErrorService) {}

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.login(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userRole', data.userRole);
                    this.router.navigate([ 'user-profile']);
                },
                error => this.errorService.handleError(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });

        if (localStorage.getItem('token') !== null){
            this.router.navigate(['user-profile']);
        }
    }
}