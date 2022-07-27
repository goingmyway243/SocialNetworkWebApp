import { HttpErrorResponse } from "@angular/common/http";

export class Util {
    static getHttpErrorMessage(httpError: HttpErrorResponse): string {
        let message = httpError.error;
        return message.substring(message.indexOf(': ') + 1, message.indexOf('\r'));
    }
}