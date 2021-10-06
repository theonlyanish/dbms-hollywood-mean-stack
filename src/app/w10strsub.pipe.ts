import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'newAge'
})
export class newAge implements PipeTransform {
  transform(value: number, ...args: number[]): number {
    let newAge: number = 0;
    newAge = 2021 - value
    return  newAge;
  }
  
}
