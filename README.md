# rxjs

## guia de apredizagem com rxjs

[link original](https://github.com/kaikcreator/rxjs-school)

## site oficial

[rxjs](https://rxjs.dev/)

## para executar o projeto com webpack

```bash
npm start
```

## criar Observable com create ou new

```bash
git checkout dev/02-subscriptions
```

```js
 // versao legada
 // const hello = Observable.create(function(observer) {
    //const forma com ts hello = new Observable((observer: Observer<string>) => {        
    const hello = new Observable((observer) => {
        observer.next('Hello');
        setTimeout(()=>{
            observer.next('World');
            observer.complete();
        }, 2000);

        // observer.complete(); nunca ira escrever o segundo aqui
    });

    const observer = {
        next: e => displayLog(e),
        error: err => console.error(`[Erro] ${err}`),
        complete: () => displayLog("Completou!!!")
    }
    
    const subscribe1 = hello.subscribe(observer);// evt => displayLog(evt));
    const subscribe2 = hello.subscribe(observer);// evt => displayLog(evt));
    // remove a subscricao cancelando as d+ execucoes dos proximos
    subscribe1.unsubscribe();
```

## Observeble com from

```bash
git checkout dev/03-from
```

```js
const myArray = [0,1,2,3,4,5,6,7];
    const myString = "Hello World";
    const myPromise = new Promise(resolve => setTimeout(() => {
        resolve("Minha Promise!")
    }, 2000));

    const observable1 = from(myArray);
    const observable2 = from(myString);
    const observable3 = from(myPromise);

    const subscribe1 = observable1.subscribe(v => displayLog(v));
    const subscribe2 = observable2.subscribe(v => displayLog(v));
    const subscribe3 = observable3.subscribe(v => displayLog(v));
```

## criando Observable com of e range

```bash
git checkout dev/04-of-and-range
```

```js
const source1 = of(1,2,3,4,5,6,7,8,9);
    const source2 = of(
        [1,2,3],
        "Ola Mundo",
        {comida: "pasto", bebida: "agua"},
        function myFunction() {
            return "uma funcao";
        }
    );
    const source3 = range(2, 9);
    
    const subscribe1 = source1.subscribe(data => displayLog(data));
    const subscribe2 = source2.subscribe(data => displayLog(data));
    const subscribe3 = source3.subscribe(data => displayLog(data));
```

## criando Observable com interval e controlando com timer

```bash
git checkout dev/05-interval-and-timer
```

```js
    const source1 = interval(500);
    const subscription1 = source1.subscribe(v => displayLog(v));

    // setTimeout(() => subscription.unsubscribe(), 3000);
    timer(3000).subscribe(() => subscription1.unsubscribe());

    const source2 = timer(4000, 100);
    const subscription2 = source2.subscribe(v => displayLog(`2 -- ${v}`));
    
    timer(6000).subscribe(() => subscription2.unsubscribe());
```

## observando enventos de interface

```bash
git checkout dev/06-fromevent
```

```js
    const acaoBotao = document.getElementById("action-btn");

    const source1 = fromEvent(acaoBotao, "click");

    source1.subscribe(event => {
        displayLog(`click event at posição (${event.x}, ${event.y})`);
    });

    const source2 = fromEvent(document, "mousemove");

    source2.subscribe(event => {
        console.log(event);
    });
```

## operadores mapTo map e filter

```bash
git checkout dev/07-mapto-map-and-filter
```

```js
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
```

## operador tap

Mostra uma previa sem alterar o conteudo

```bash
git checkout dev/08-tap
```

```js
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
```

## limitando eventos com first, take e takeWile

```bash
git checkout dev/09-first-take-takewhile
```

```js
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
```

## operadores last takeLast e skip

```bash
git checkout dev/10-last-takelast-skip
```

```js
// operador last
export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col > 3 ),
        /tap(v => console.log(`${v} é valido em operador takeWhile`)),
        // ultimo evento
        last()
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}
```

```js
// operador takeLast
export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col > 3 ),
        tap(v => console.log(`${v} é valido em operador takeWhile`)),
        // ultimo n envetos
        takeLast(3) // tres eventos
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}
```

```js
// operador skip
export default () => {
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        tap(v => console.log(`${v} coordenada`)),
        skip(5) // pula 5 eventos
    );

    const subscription = click$.subscribe(data => displayLog(data));

    /** end coding */
}
```

## git checkout dev/11-reduce-scan

The difference is an observable created with `scan` will emit on each source emission, whereas `reduce` will emit `only once` on completion.

```js
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
```

## dev/12-startwith-endwidth

Faz algo antes com `startwith` e depois `endwidth` do observeble

```js
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
```

## operador distict diferencia um evento do outro

```js
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
```
