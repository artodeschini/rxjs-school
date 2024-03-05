import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, first, take, takeWhile } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        //first(v => v[0]> 3) // limita o numero de eventos no caso aqui 
        //take(4) // serao monitorados 4 eventos apos serao discartados
        takeWhile(([col, row]) => col > 3)
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}