import { DateTime } from "ionic-angular";

export interface Book{
    date : string;
    ra : string;
    check : boolean;
    place : string;
    inicio : DateTime;
    termino : DateTime;
}