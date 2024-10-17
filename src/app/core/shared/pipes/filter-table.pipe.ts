import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if (!items) {
      return [];
    }

    if (!term) {
      return items;
    }

    const termo = term.toLowerCase();
    return items.filter(item => {
      let itemBuscado = item?.titulo + ' ' + item?.descricao;
      if (itemBuscado.toLowerCase().includes(termo)) {
        return item;
      }
    });
  }

}
