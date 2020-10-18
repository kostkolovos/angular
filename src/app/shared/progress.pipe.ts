import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterProgress',
    pure: false
})
export class ProgressPipe implements PipeTransform {

    transform(value: any, filterString: number): any {
        const filterNumber: number = +filterString; // convert string to number
        const resultArray = [];
        for (const item of value) {
            if (item.orderProgress.id === filterNumber) {
                resultArray.push(item);
            }
        }

        return resultArray;
    }

}
