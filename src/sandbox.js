import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, distinct, distinctUntilChanged } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        //map(([col, row]) => col+row),
        tap(val => console.log('sum of col + row is:', val)),
        distinct(([col, row]) => `${col} - ${row}`),
        /*distinctUntilChanged((c1, c2) =>
            (c1[0] == c2[0]) && (c1[1] == c2[2])
        ) */

    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}