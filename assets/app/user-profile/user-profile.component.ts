import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AppService } from "../app.service";
import {ErrorService} from "../errors/error.service";
import { User} from "../user/user.model";

@Component({
    selector: 'app-user-profile',
    templateUrl: "user-profile.component.html"
})

export class UserProfileComponent implements OnInit{
    userProfileForm: FormGroup;
    currentUser: any={};   
    
    constructor(private authService: AppService, private router: Router, private errorService: ErrorService) {}
    
    onUpdate(){
        const updateUser = new User(
            this.userProfileForm.value.email,
            this.userProfileForm.value.password,
            this.userProfileForm.value.firstName,
            this.userProfileForm.value.lastName
        );
        this.authService.updateUserProfile(updateUser)
            .subscribe(
                data => this.errorService.handleError(data),
                error => this.errorService.handleError(error)
            );
    };

    onLogout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    ngOnInit(){
        this.authService.getUserProfile()
            .subscribe(
                user => this.currentUser=user.user,
                error => this.errorService.handleError(error)
            );

        this.userProfileForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl(),
            password: new FormControl('', Validators.required)
        });

        if (localStorage.getItem('token') == null){
            this.router.navigate(['**']);
        }

    };
}