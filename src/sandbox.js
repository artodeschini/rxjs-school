import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { endWith, map, startWith, takeWhile, tap } from 'rxjs/operators';

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
        startWith('Grid dimensoes 10 x 10'),
        endWith("Game fim",  "bye")
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}