import { UserInfo } from "firebase";

export interface User{
    displayName : string;
    email : string;
    emailVerified : boolean;
    photoURL : string;
    uid : string;
    phoneNumber : string;
    providerData : UserInfo[];
}