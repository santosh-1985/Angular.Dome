import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { enableProdMode, provide } from '@angular/core';
import {UrlSerializer} from '@angular/router'
import {LowerCaseUrlSerializer} from './LowerCaseUrlSerializer'


bootstrap(AppComponent, [
    Http,
    APP_ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(UrlSerializer,{useClass: LowerCaseUrlSerializer}),     
    disableDeprecatedForms(),
    provideForms(),

])
    .then(
    success => {


        console.log("=====Calling Main .Ts Done======");

    },
    error => console.log(error)

    );

