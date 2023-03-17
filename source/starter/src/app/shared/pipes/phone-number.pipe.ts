import { Pipe, PipeTransform } from '@angular/core';
import parsePhoneNumber from 'libphonenumber-js'

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: number): string {
    return parsePhoneNumber(value.toString(), 'CA').format('NATIONAL');
  }

}
