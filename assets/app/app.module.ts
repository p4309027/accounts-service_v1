import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { routing } from "./app.routing";
import { AppService } from "./app.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorComponent,
        PageNotFoundComponent,
        LoginComponent,
        RegisterComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [AppService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}