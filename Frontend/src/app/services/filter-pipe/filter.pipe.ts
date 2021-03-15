import { Pipe, PipeTransform } from '@angular/core';
import {Recipe} from '../../models/recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // return a list with recipes filtered by words in search text
  transform(items: Recipe[], searchText: string): Recipe[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    // searchText = searchText.toLocaleLowerCase();
    const words = searchText.toLocaleLowerCase().split(' ');

    for (const word of words) {
      items = items.filter(item => {
        return item.name.toLocaleLowerCase().includes(word) ||
          item.ingredients.includes(word);
      });
    }

    return items;
  }

}
