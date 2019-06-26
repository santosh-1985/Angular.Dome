export interface NoteOptions {
    displayText: string;
    value: string;
}
export interface NoteOptionsInterface {
    dtoDropDownList: NoteOptions;
}
export interface Errorinfo {
    ErrorCode: string;
    Message: string;
    Success: string;
    ApplicationName: string;

}
export interface SCTDropDown {
    displayText: string;
    value: string;
}
export interface InstallmentDTO {
    installmentCollectionDate: string;
    installmentDueDate: string;
    installmentDueAmount: string;
}

export interface PetPolicyDetailsDTO {
    policyNumber: string;
    policyStatus: string;
    renewalDate: string;
    inceptionDate: string;
    lastRenewalTerm: string;
    policyExpiryDate: string;
    paymentMethod: string;
    howManyPetsHouseHold: string;
    howManyPetsInsured: string;
    lastRenewalDate: string;
    cAT: string;
    totalToPay: string;
    totalToPayWithoutTax: string;
    frequency: string;
}
export interface PaymentSuccess {
    status: string,
    PolicyNumber: string,
    ResponseMessgae: string
    collectionNumber: string;
}

export interface QueryString {
    status: boolean;
    PolicyNumber: string;
    ResponseMessgae: string;
}
/**export interface QueryString {
    status: boolean;
    PolicyNumber: string;
    ResponseMessgae: string;
} */