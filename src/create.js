import { displayLog } from './utils';
import { Observable, Observer } from 'rxjs';


export default () => {
    /** start coding */
    // new Observable((observer: Observer) => {
    //     observer.next();
    //     observer.complete();
    // });
    // const hello = Observable.create(function(observer) {
    //const hello = new Observable((observer: Observer<string>) => {        
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
    /** end coding */
}