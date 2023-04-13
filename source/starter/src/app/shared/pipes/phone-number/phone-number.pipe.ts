import { Pipe, PipeTransform } from '@angular/core';
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: any): string {
    return new AsYouType('US').input(value);
  }

}
