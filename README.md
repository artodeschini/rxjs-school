# rxjs

## guia de apredizagem com rxjs

[link original](https://github.com/kaikcreator/rxjs-school)

## para executar

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
