import { fromEvent } from 'rxjs';
import { displayLog } from './utils';
import { mapTo, map, filter } from 'rxjs/operators';


export default () => {
    /** start coding */
    const grid = document.getElementById('grid');

    const click$ = fromEvent(grid, 'click').pipe(
        // mapTo("CLICK") // fuciona mas é deprecated
        // map(() => "CLICK") // ao inves de usar mapTo use assim
        // map(e => [e.offsetX, e.offsetY]) // cada quadrado tem 50 px para pegar a posicao
        map(e => [
            Math.floor(e.offsetX / 50),
            Math.floor(e.offsetY / 50)
        ]),
        filter(v => (v[0] + v[1]) % 2 != 0) // pega só os eventos nas casas cinzas
    );
    const subscribe = click$.subscribe(e => { displayLog(e) });

    /** end coding */
}