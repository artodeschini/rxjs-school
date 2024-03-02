import { displayLog } from './utils';
import { from } from 'rxjs';

export default () => {
    /** start coding */
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

    /** end coding */
}