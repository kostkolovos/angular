import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterStatus',
    pure: false
})
export class StatusPipe implements PipeTransform {

    transform(value: any, filterString: boolean): any {
        const resultArray = [];
        for (const item of value) {

            if (item.status === filterString) {
                resultArray.push(item);
            }
        }

        return resultArray;
    }

}

