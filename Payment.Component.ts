import {Component, Injectable, Output,Input, EventEmitter, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Route, ROUTER_DIRECTIVES, Router } from '@angular/router';
import {ProcessHeaderComponent} from '../../../../../../../common/ProcessHeader/Component/ProcessHeader.Component';
import {ExceptionModalComponent} from '../../../../../../../common/ExceptionModal/Component/ExceptionModal.Component';
import {LandingPageService} from '../../../../../../../common/LandingPage/Service/LandingPage.Service';
import {SubNavigationComponent} from '../../../../../../../common/SubNavigation/Component/SubNavigation.Component';
import {BaseRequestService} from '../../../../../../../common/BaseRequestDetails/Service/BaseRequest.Service';
import { Observable } from 'rxjs/Rx';
import {Errorinfo} from '../../../../../../../common/SearchPage/Interface/SearchPage.Interface';
import URL = require('../../../../../../../AppSettings');

import {NoteOptionsInterface, NoteOptions,  SCTDropDown, InstallmentDTO,
    PetPolicyDetailsDTO, PaymentSuccess, QueryString}from '../Interface/Payment.Interface';
import {PetPaymentDetailsService} from '../Service/Payment.Service';
import {AfterCallArgosComponent} from '../../../../../../../common/AfterCallArgosInProcess/Component/AfterCallArgos.Component';
declare var $: any;

let PaymentUrl = URL.PaymentExePath;

@Component({
    selector: 'router-outlet',
    templateUrl: 'app/Modules/Argos/Products/Pet/Process/Payment/View/Payment.Component.html',
    directives: [ROUTER_DIRECTIVES, ProcessHeaderComponent, AfterCallArgosComponent, ExceptionModalComponent, SubNavigationComponent],
    providers: [BaseRequestService, PetPaymentDetailsService]

})

export class PetPaymentComponentArgos implements OnDestroy, OnInit, AfterViewInit {
    //Used to create a Key, Value parir for sending the Body to Stringifing Method for the stringified Output.
    bodyVals: { [id: string]: string; };
    policyNumber: any;
    @Input() thankYouFlag: boolean;
    @Input() voucherDescription:string;
    // NoteOptionsPaymentInterface: NoteOptions[];
    noteOptionsInterface: NoteOptions[];
    notesvalue: string;
    validationMsgList: Errorinfo[];
    selectedNoteValue: any;
    noteTitle: any;
    addonUpSellDropdown: SCTDropDown[];
    subOutcomeDropdwon: SCTDropDown[];
    selectedAddOn: any;
    selectedSubOutcome: any;
    checkEarlySettlement: boolean;
    checkThankYouVoucher: boolean;
    PetPaymentInstallmentDetails: InstallmentDTO[];
    emptyString: any;
    poundSign: any;
    singleSpace: any;
    InstallmentFlag: boolean;
    frequencyAnnual: any;
    frequencyMonthly: any;
    paymentMethodCreditCard: any;
    paymentMethodDebitCard: any;
    paymentMethodCheque: any;
    paymentMethodDirectDebit: any;
    PetPaymentDetails: PetPolicyDetailsDTO;
    totalToPay: any;
    validationFields: string[];
    issueRenewalDisability: boolean;
    aftercallDisability: boolean;
    petPremiumDetails: any;
    sctSectionVisibility: any;
    earlySettlementVisibility: any;
    paymentSuccess: PaymentSuccess;
    discountSuccessMsg: string;
    sessionPaymentStatus: any;
    sessionStatInProgress: any;
    sessionStatComplete: any;
    sessionStatFailed: any;
    isPaymentProcess: string;
    queryString: QueryString;
    selectVar: any;
    processName: string;
    referenceNumber: any;
    isROR: boolean;
    internalError: Errorinfo;
    paymentMethod:string;
    PaymentStatus:boolean = false;
    RSALogoDisability:boolean;
    
    constructor(private router: Router,
        private _baseRequestService: BaseRequestService,
        private _petpaymentService: PetPaymentDetailsService) {
        this.bodyVals = {};
        this.policyNumber = "";
        this.noteOptionsInterface = [];
        this.notesvalue = "";
        this.validationMsgList = [];
        this.selectedNoteValue = "";
        this.noteTitle = "";
        this.addonUpSellDropdown = [];
        this.subOutcomeDropdwon = [];
        this.selectedAddOn = "";
        this.selectedSubOutcome = "";
        this.checkEarlySettlement = false;
        this.checkThankYouVoucher = false;
        this.PetPaymentInstallmentDetails = [];
        this.poundSign = ["&#163;", "&pound;", "£"];
        this.emptyString = "";
        this.singleSpace = " ";
        this.InstallmentFlag = true;
        this.frequencyAnnual = "ANNUAL";
        this.frequencyMonthly = "MONTHLY";
        this.paymentMethodCreditCard = "CREDIT CARD";
        this.paymentMethodDebitCard = "DEBIT CARD";
        this.paymentMethodCheque = "CHEQUE";
        this.paymentMethodDirectDebit = "DIRECT DEBIT";
        this.PetPaymentDetails = "";
        this.totalToPay = "";
        this.issueRenewalDisability = false;
        this.aftercallDisability = true;
        this.petPremiumDetails = [];
        this.sctSectionVisibility = false;
        this.earlySettlementVisibility = false;
        this.sessionPaymentStatus = "paymentStatus";
        this.sessionStatInProgress = "InProgress";
        this.sessionStatComplete = "Complete";
        this.sessionStatFailed = "Failed";
        this.isPaymentProcess = "";
        this.queryString = "";
        this.selectVar = "Select";
        this.referenceNumber = "";
        this.isROR = false;
        this.processName = '';
        this.paymentMethod ="";
        this.RSALogoDisability=false;
    }

    ngOnDestroy() {
    }
    ngOnInit() {
        this.voucherDescription = sessionStorage.getItem("thankYouResponse");
        if(this.voucherDescription !=null && this.voucherDescription.trim() !="" && this.voucherDescription.toLowerCase().trim() != "not eligible for voucher"){
            //this.voucherDescription = sessionStorage.getItem("thankYouResponse");
            this.thankYouFlag = true;
        }else{
             this.thankYouFlag = false;
        }
        if (sessionStorage.getItem('customerDetails') != null && sessionStorage.getItem('customerDetails') != "") {
            var customerDetailsParsed = JSON.parse(sessionStorage.getItem('customerDetails'));
            
            if (sessionStorage.getItem('customerDetails') != null && sessionStorage.getItem('customerDetails') != "") {
                var customerDetailsParsed = JSON.parse(sessionStorage.getItem('customerDetails'));
                if ((customerDetailsParsed.customerDetailsDTO.customerDTO.isRORStatus != null && !'' 
                    && customerDetailsParsed.customerDetailsDTO.customerDTO.isRORStatus.toUpperCase() == "ROR") 
                    ||(customerDetailsParsed.customerDetailsDTO.customerDTO.sPolicyStatus != null && !'' 
                    && customerDetailsParsed.customerDetailsDTO.customerDTO.sPolicyStatus.toLowerCase() != 'active' && !'policy' && !'inforce' && !'in force' && !"live" )) {
                    if (customerDetailsParsed.customerDetailsDTO.customerDTO.isRORStatus == null) {
                        this.isROR = false;
                    }else{
                        this.isROR = customerDetailsParsed.customerDetailsDTO.customerDTO.isRORStatus;
                    }
                }
            }
        }

        this.processName = 'Payment';
        sessionStorage.setItem('process', 'Payment');
        let body = this.BodyJSONStringifier();
        var getSessionPolicyDetails = sessionStorage.getItem("policyDetails");
        if (this.checkForEmptyNullOrUndefined(getSessionPolicyDetails)) {
            //This is when the Session Details are Either Null/ Empty / Undefined...
        }
        else {
            this.OnInitVariableMappings(getSessionPolicyDetails, body);
        }

    }

    ngAfterViewInit() {
        //To open after call slider 
        $('#opener, #openerDash').on('click', function () {
            var panel = $(this).closest('.slide-panel');
            if (panel.hasClass("visible")) {
                panel.removeClass('visible').animate({ 'margin-right': '-950px' });
            } else {
                panel.addClass('visible').animate({ 'margin-right': '-1px' });
            }
            return false;
        });

        $(".completeCall").click(function () {
            // $("#warning").modal('show');
        });

        $('#ArgosPetPayment').show();

    }
    // #region OnChange Methods...
  
    private onChangeEarlySettlement(event: boolean) {
        this.checkEarlySettlement = event;
        this.VisibilityIssueRenewal(event);
    }
    
    private onChangeThankYouVoucher(event: boolean) {
        this.checkThankYouVoucher = event;
        this.sctSectionVisibility = this.checkThankYouVoucher;
    }
 
    // #region Component Methods...
    private BodyJSONStringifier(): string {
        this.bodyVals["sActionType"] = 'Payment';
        this.bodyVals["TransactionId"] = sessionStorage.getItem("transactionID");
        this.bodyVals["guid"] = sessionStorage.getItem("transactionID");
        this.bodyVals["ActionId"] = this._baseRequestService.identifyApplication('Argos', 'PET');
        this.bodyVals["sProcessId"] = this._baseRequestService.identifyProcesses('Argos', 'Pet', 'RENEWAL_PREMIUM_PAY');
        this.bodyVals["sUserId"] = sessionStorage.getItem('userID');
        this.bodyVals["sUserGroupId"] = sessionStorage.getItem('userGroupID');
        this.bodyVals["sSOPName"] = " ";
        this.bodyVals["sLOB"] = "Pet";
        this.bodyVals["policyNumber"] = sessionStorage.getItem("polNo");
        this.bodyVals["RSA_policy_reference"] = sessionStorage.getItem("polNo");
        this.bodyVals["affinityName"] = sessionStorage.getItem('affiliateSelected');
        this.policyNumber = this.bodyVals["policyNumber"];
        return JSON.stringify(this.bodyVals);
    }

    private OnInitVariableMappings(getSessionPolicyDetails: any, body: any) {

        $(".loaderPage").css({ "display": "block" }).hide();
        console.log("Pet Policy Details from session " + getSessionPolicyDetails);
        var finalJson = JSON.parse(getSessionPolicyDetails);
        if (!this.checkForEmptyNullOrUndefined(finalJson)) {
            //If Final JSON not equal to Null/Empty/Undefined then we will execute the mappings.

            this.PetPaymentDetails = finalJson.dtoPetPolicyDetails;
            if(this.PetPaymentDetails!=null){
                this.totalToPay = this.PetPaymentDetails.totalToPay;
                this.totalToPay = this.removeIfPoundFound(this.totalToPay);
                this.totalToPay = this.removeIfCommaFound(this.totalToPay);
                
                this.PetPaymentInstallmentDetails = finalJson.installmentDetail;
                this.paymentMethod = this.PetPaymentDetails.paymentMethod;
                if (this.PetPaymentDetails.frequency.toUpperCase() == this.frequencyMonthly) {
                    //If Freqency is Monthly then Show Installment Details Table.
                    this.InstallmentFlag = true;
                }
                else {
                    this.InstallmentFlag = false;
                }
            } 
            
            this.petPremiumDetails =[];
            if(finalJson.dtoPetDetails != null && finalJson.dtoPetDetails.length != 0){
                for(var i = 0;i < finalJson.dtoPetDetails.length ; i++){
                    this.petPremiumDetails.push({"name":"","revisedPremium":"","premium":""});
                    this.petPremiumDetails[i].name = finalJson.dtoPetDetails[i].petName;
                    this.petPremiumDetails[i].revisedPremium = "";
                    this.petPremiumDetails[i].premium = finalJson.dtoPetDetails[i].premiumPerExposure;
                }
            }
            this.DisablitiyIssueRenewal();

        }

    }

    //On Issue Renewal Click...
    private BtnIssueRenewalClick() {
        console.log("Issue Renewal Process Started. . .");
        this.issueRenewalDisability = true;
        sessionStorage.setItem(this.sessionPaymentStatus, this.sessionStatInProgress);
        this.discountSuccessMsg = "Payment in progress...";
        var issueRenewalJSON: { [id: string]: any; } = {};
        issueRenewalJSON = this.bodyVals;
        issueRenewalJSON["earlySettlement"] = this.checkEarlySettlement;
        issueRenewalJSON["cardType"] = this.paymentMethod;
        issueRenewalJSON["paymentMethod"] = this.paymentMethod;
      
        issueRenewalJSON["isCallForDiscount"] = false; 
        var paymentMethod = "";
        this.RSALogoDisability=true;
        this.isPaymentProcess = "Yes";
        this._petpaymentService.checkInBoundFolders(issueRenewalJSON).subscribe(PetPolicy => {
            console.log("payment Bot trigger response ::: " + this.paymentSuccess);
            this.setPaymentSuccess(this.totalToPay, issueRenewalJSON["earlySettlement"], paymentMethod, issueRenewalJSON["policyNumber"]);
            this.setQueryString();

        }, error => {
            this.setErrorFunction(error, 'Argos payment');
        });
    }

    private setQueryString() {
        var paymentMethod = (this.PetPaymentDetails.paymentMethod);
        var issueRenewalJSON: { [id: string]: any; } = {};
        issueRenewalJSON = this.bodyVals;
        issueRenewalJSON["RSA_policy_reference"] = sessionStorage.getItem("polNo");
        issueRenewalJSON["earlySettlement"] = this.checkEarlySettlement;
        issueRenewalJSON["amount"] = this.totalToPay;
        issueRenewalJSON["discountedPremium"] = "";
        issueRenewalJSON["guid"] = sessionStorage.getItem("transactionID");
        issueRenewalJSON["paymentMethod"] = paymentMethod;

        this._petpaymentService.getQueryString(issueRenewalJSON).subscribe(PetPolicy => {
            this.queryString = PetPolicy;
            console.log(this.queryString.PolicyNumber);
            console.log(this.queryString.ResponseMessgae);
            console.log(this.queryString.status);
            this.runExe(this.queryString);
        }, error => {
            this.setErrorFunction(error, 'Argos Payment');
        });
    }

    private runExe(queryString: QueryString) {

        var TransactionId = sessionStorage.getItem("transactionID");
        console.log("p no ::: " + this.queryString.PolicyNumber);
        console.log("r msg ::: " + this.queryString.ResponseMessgae);
        console.log("status ::: " + this.queryString.status);
        if (this.queryString.status == false) {
            if (sessionStorage[this.sessionPaymentStatus] == this.sessionStatInProgress) {
                this.setQueryString();
            }
            else {
                //There must be some issue with the Payment.
                if (sessionStorage[this.sessionPaymentStatus] == this.sessionStatFailed) {
                    this.issueRenewalDisability = false;
                    this.discountSuccessMsg = "Payment process is interrupted, please try again";
                    // $(".loaderPage").css({ "display": "block" }).hide();
                }
            }
        }
        else {
            $(".loaderPage").css({ "display": "block" }).hide();
            var MyObject = new ActiveXObject("WScript.Shell");
            console.log("Active X instantiated");
            MyObject.Run(PaymentUrl + " " + this.queryString.PolicyNumber + " " + this.queryString.ResponseMessgae + " ");
             console.log(this.queryString.PolicyNumber + " " + this.queryString.ResponseMessgae + " ");
            //MyObject.Run('C:/NetBanxExe/NetBanxPaymentManager.exe' + " " + this.queryString.PolicyNumber + " " + this.queryString.ResponseMessgae + " ");
        }
    }

    //end queryString

    private setPaymentSuccess(amount: string, earlySettlement: boolean, paymentMethod: string, policyNumber: string) {

        var issueRenewalJSON: { [id: string]: any; } = {};
        issueRenewalJSON = this.bodyVals;
        issueRenewalJSON["ProcessName"] = this.processName;
        issueRenewalJSON["amount"] = amount;
        issueRenewalJSON["nbx_payment_amount"] = amount;
        issueRenewalJSON["nbx_currency_code"] = "GBP";
        issueRenewalJSON["amountDiscounted"] = "0";
        issueRenewalJSON["RSA_policy_reference"] = sessionStorage.getItem("polNo");
        issueRenewalJSON["isCallForDiscount"] = false;
        this.getPaymentSuccess(issueRenewalJSON);
    }

    private getPaymentSuccess(body: any) {
        this._petpaymentService.getPaymentSuccess(body).subscribe(PetPolicy => {
            this.RSALogoDisability=false;
            this.paymentSuccess = PetPolicy;
            console.log("payment Bot trigger response ::: " + this.paymentSuccess);
            this.discountSuccessMsg = this.paymentSuccess.ResponseMessgae;
            $(".loaderPage").css({ "display": "block" }).hide();
            if (PetPolicy.success == true) {
                this.referenceNumber = this.paymentSuccess.collectionNumber;
                sessionStorage[this.sessionPaymentStatus] = this.sessionStatComplete;
                this.validationMsgList = PetPolicy.messageList;
                this.discountSuccessMsg = this.validationMsgList.length > 0 ? this.validationMsgList[0].Message : "";
                $('#inProcessSuccessModal').modal('show');
                this.isPaymentProcess = "";
                this.aftercallDisability = false;
                this.issueRenewalDisability = true;
                this.PaymentStatus = true;
            }
            else {
                this.referenceNumber = "";
                sessionStorage[this.sessionPaymentStatus] = this.sessionStatFailed;
                this.aftercallDisability = true;
                this.issueRenewalDisability = false;
                this.isPaymentProcess = "";
                this.validationMsgList = PetPolicy.Errorinfo;
                this.discountSuccessMsg = this.validationMsgList.length > 0 ? this.validationMsgList[0].Message : "";
                $('#exceptionModal').modal('show');
            }
        }, error => {
            this.setErrorFunction(error, 'Argos Payment');
            //$("#afterCall").modal('hide');
        });
    }

    //#region Visibility switching Methods...

    private DisablitiyIssueRenewal() {
        var frequency = (this.PetPaymentDetails.frequency).toUpperCase();
        var paymentMethod = (this.PetPaymentDetails.paymentMethod).toUpperCase();
        
        if (frequency == this.frequencyMonthly || paymentMethod == this.paymentMethodDirectDebit) {
            //If frequency is Monthly then we should disable Issue Renewal Button...
            this.issueRenewalDisability = true;
        }
        else {
            this.issueRenewalDisability = false;
        }

        this.VisibilityEarlySettlement();
    }
    
    private VisibilityEarlySettlement() {
        var frequency = (this.PetPaymentDetails.frequency).toUpperCase();
        var paymentMethod = (this.PetPaymentDetails.paymentMethod).toUpperCase();

        if (frequency == this.frequencyMonthly || paymentMethod == this.paymentMethodDirectDebit) {
            this.earlySettlementVisibility = true;
        }
        else {
            this.earlySettlementVisibility = false;
        }

    }

    private VisibilityIssueRenewal(status:boolean) {
        var frequency = (this.PetPaymentDetails.frequency).toUpperCase();
        var paymentMethod = (this.PetPaymentDetails.paymentMethod).toUpperCase();
        if (frequency == this.frequencyMonthly || paymentMethod == this.paymentMethodDirectDebit) {
            //also if early settlement is checked then issue renewal should be enabled.
            if (status == true  && this.PaymentStatus==false) {
                this.issueRenewalDisability = false;
            }
            else {
                this.issueRenewalDisability = true;
            }
        }
    }

    // #region Common Methods...

    private checkForEmptyNullOrUndefined(control: any) {

        if (parseInt(control) == 0) {
            return false;
        }
        if (control == null || control == undefined || control == "") {
            return true;
        }
        return false;
    }

    onThankYouSuccess(obj:any){
        this.thankYouFlag = obj.voucher;
        /**Identify number from a string */
        if(obj.voucherValue!=null && obj.voucherValue.trim()!=""){
          this.voucherDescription = obj.voucherValue;
          console.log(this.voucherDescription);  
        }
    }

    getErrorFunction(error: any, applicationActivity: string) {

        this.internalError = Object();
        this.internalError.Message = 'We are facing technical difficulties for fetching policy details please try after sometime, meanwhile you can proceed with manual process for particular transaction';
        this.internalError.Success = 'Failure';
        this.internalError.ApplicationName = 'Customer Manager Portal';
        $(".loaderPage").css({ "display": "block" }).hide();
        this.internalError.ErrorCode = error.status;
        this.internalError.ApplicationActivity = applicationActivity;
        this.validationMsgList.push(this.internalError);
        $('#exceptionModal').modal('show');
    }

    setErrorFunction(error: any, applicationActivity: string) {

        this.validationMsgList = [];
        this.internalError = Object();
        this.internalError.Message = 'We are facing technical difficulties for fetching policy details please try after sometime, meanwhile you can proceed with manual process for particular transaction';
        this.internalError.Success = 'Failure';
        this.internalError.ApplicationName = 'Customer Manager Portal';
        $(".loaderPage").css({ "display": "block" }).hide();
        this.internalError.ErrorCode = error.status;
        this.internalError.ApplicationActivity = applicationActivity;
        this.validationMsgList.push(this.internalError);
        $('#exceptionModal').modal('show');

    }
    
    private findStringExists(mainString: string, searchString: string): boolean;
    private findStringExists(mainString: string, searchString: string[]): boolean;
    //Below overloaded method used to find the string in array and split that occurance to specify split operation
    private findStringExists(mainString: string, searchString: string[], doSplit: boolean): string;
    private findStringExists(arg1: any, arg2: any, arg3?: any): any {
        if (typeof (arg2) == 'string') {
            if ((arg1.indexOf(arg2)) == -1) {
                //String not found
                return false;
            }
            else {
                return true;
            }
        }
        else {
            //It will be string Array...
            for (let arg of arg2) {
                if ((arg1.indexOf(arg)) != -1) {
                    if (typeof (arg3) == 'boolean') {
                        if (arg3 == true) {
                            //Split needed so we need to split the occurance and return the string value...
                            var num = "";
                            num = arg1.split(arg).pop()
                            return num;

                        }
                    }
                    return true;
                }
            }
            return false;
        }
    }
    private removeIfPoundFound(value: any): string {
        if (value == "" || value == null || value == undefined) {
            return value;
        }
        var stat: any = this.findStringExists(value, this.poundSign, true);
        if (parseInt(stat) == 0) {
            return stat;
        }
        if (stat != false) {
            //Pound Sign found
            //valueToAssign = stat;
            return stat;
        }
        else if (stat == false) {
            return value;
        }
    }
    private removeIfCommaFound(value: any) {
        if (value == "" || value == null || value == undefined) {
            return value;
        }
        var stat: any = this.findStringExists(value, ',');
        if (stat) { //Comma Found, So Trim...
            value = value.replace(/,/g, '');
            return String(value);
        }
        else {
            return value;
        }

    }

}