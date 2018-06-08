import { DateTime } from "ionic-angular";

export interface Book{
    date : string;
    ra : string;
    state : string;
    place : string;
    inicio : DateTime;
    termino : DateTime;
}