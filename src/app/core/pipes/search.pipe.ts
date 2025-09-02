import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrOfObj:any[] , term:string): any[] {
    return arrOfObj.filter( (item)=> item.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
