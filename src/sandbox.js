import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, tap, reduce } from 'rxjs/operators';

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
        /* reduce((acumulados, current) => {
            return {
                clicks: acumulados.clicks + 1,
                cells: [... acumulados.cells, current]
            }
        }, 
        {clicks: 0, cells: []} // na primeira passada o acumulado assume esse objeto
        ) // fim reduce */
        scan((acumulados, current) => {
            return {
                clicks: acumulados.clicks + 1,
                cells: [... acumulados.cells, current]
            }
        }, 
        {clicks: 0, cells: []} // na primeira passada o acumulado assume esse objeto
        ) // fim scan
    );

    const subscription = click$.subscribe(data => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));

    /** end coding */
}