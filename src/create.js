import { displayLog } from './utils';
import { interval, timer } from 'rxjs';

export default () => {
    /** start coding */
    const source1 = interval(500);
    const subscription1 = source1.subscribe(v => displayLog(v));

    // setTimeout(() => subscription.unsubscribe(), 3000);
    timer(3000).subscribe(() => subscription1.unsubscribe());

    const source2 = timer(4000, 100);
    const subscription2 = source2.subscribe(v => displayLog(`2 -- ${v}`));
    
    timer(6000).subscribe(() => subscription2.unsubscribe());

    /** end coding */
}