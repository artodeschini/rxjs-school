import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, takeWhile, last, tap, takeLast, skip } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        // takeWhile( ([col, row]) => col > 3 ),
        // tap(v => console.log(`${v} é valido em operador takeWhile`)),
        // ultimo evento
        // last()
        // ultimo n envetos
        // takeLast(3) // tres eventos
        tap(v => console.log(`${v} coordenada`)),
        skip(5) // pula 5
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}