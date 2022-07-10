import 'mocha';
import { expect } from 'chai';
import Sinon from 'sinon';

import Subject from '.';

describe('Subject', () => {
    it('calls observer on subscribe', () => {
        const func = Sinon.spy(v => void 0);
        const subject = new Subject(0);
        subject.subscribe(func);
        expect(func.getCalls().length).equals(1);
    });

    it('calls observer on update', () => {
        const func = Sinon.spy(v => void 0);
        const subject = new Subject(0);
        subject.subscribe(func);
        subject.push(1);
        expect(func.getCalls().length).equals(2);
    });

    it('does not call unsubscribed observers', () => {
        // Setup observer
        let value = 0;
        const func = Sinon.spy((v: number) => value = v);

        // Create subject and subscribe
        const subject = new Subject(0);
        const unsubscribe = subject.subscribe(func);

        // First update - should call subscriber
        subject.push(1);

        // Unsubscribe
        unsubscribe();

        // Second update - should not call any subscribers
        subject.push(2);

        // Verify:
        expect(func.getCalls().length).equals(2);
        expect(value).is.a('number').that.equals(1);
    });
});
