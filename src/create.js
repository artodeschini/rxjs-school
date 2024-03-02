import { displayLog } from './utils';
import { of, range } from 'rxjs';

export default () => {
    /** start coding */
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


    /** end coding */
}