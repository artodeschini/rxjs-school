import { displayLog } from './utils';
import { fromEvent } from 'rxjs';

export default () => {
    /** start coding */
    const acaoBotao = document.getElementById("action-btn");

    const source1 = fromEvent(acaoBotao, "click");

    source1.subscribe(event => {
        displayLog(`click event at posição (${event.x}, ${event.y})`);
    });

    const source2 = fromEvent(document, "mousemove");

    source2.subscribe(event => {
        console.log(event);
    });

    /** end coding */
}