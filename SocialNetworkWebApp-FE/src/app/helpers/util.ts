import { HttpErrorResponse } from "@angular/common/http";

export class Util {
    static getHttpErrorMessage(httpError: HttpErrorResponse): string {
        let message = httpError.error;
        return message.substring(message.indexOf(': ') + 1, message.indexOf('\r'));
    }

    static padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    static formatDate(date: Date): string {
        let values = date.toString().slice(0, 10).split('-');
        values.reverse();

        return [...values].join('/');
    }
}