import {describe, expect, test} from '@jest/globals';
import { FSM } from '../../syncapi/src/fsm/fsm';


let fsm = new FSM();

fsm.setContext(`tocloud//captor_values//{"captor_id":"001", "value": "22", "created_at": "${new Date().getTime()}"}//insert`);


test('true egual true', () => {
    expect(fsm.startFsm()).toBe(true);
});