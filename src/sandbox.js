import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        tap(antes => console.log(`antes original ${antes} e ${JSON.stringify(antes)}`)),
        map(val => [
            // pega as coordenadas ma grid cada celula tem 50px x 50px
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        tap(depois => console.log(`depois ${depois}`))
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}