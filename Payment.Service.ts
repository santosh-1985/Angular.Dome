import { Component, Injectable } from '@angular/core';
import {Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import { IPetPayment, NonFinancialIncentive, NoteOptions, AddOnUpSellData, DiscountAdjustmentsDetails, QueryString,GetDiscountDetails } from '../Interface/Payment.Interface';
import { NoteOptions, NoteOptionsInterface, QueryString, PaymentSuccess} from '../Interface/Payment.Interface';
import URL = require('../../../../../../../AppSettings');

let url = URL.Baseurl + 'pet/GetPetPolicyDetails';
let urlQuery = URL.Baseurl + 'Payment/ReadProxyDataFromfileSystem';
let urlPaymentCheck = URL.Baseurl + 'Payment/CleanPaymentfileSystem';
let urlSuccess = URL.Baseurl + 'ArgosPet/ExecuteAISPaymentWorkFlow';
@Injectable()
export class PetPaymentDetailsService {


    constructor(private _http: Http) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    checkInBoundFolders(bodydata: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(urlPaymentCheck, bodydata, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getQueryString(body: any) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(urlQuery, body, { headers: headers })
            .map((response: Response) =>
                <QueryString>response.json())
            .catch(this.handleError);
    }
    
    getPetPaymentDetails(body: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        console.log('Error occured in service');
        return Observable.throw(errMsg);
    }
 
    getPaymentSuccess(body: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(urlSuccess, body, { headers: headers })
            .map((response: Response) =>
                <PaymentSuccess>response.json())
            .catch(this.handleError);
    }
}