import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
@Injectable({
  providedIn: 'root'
})
export class AddressPipe implements PipeTransform {

  transform(address: any): string {
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
  }

}
