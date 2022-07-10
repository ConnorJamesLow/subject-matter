type Observer<T> = (d?: T) => any;
type Unsubscriber = () => boolean;
type Updater<T> = (v?: T) => T;

const throwNotSupported = () => { throw `Functions are not supported.`; }

export default class Subject<T> {
    protected __data: T;
    protected __observers: Record<symbol, Observer<T>> = {};

    constructor(data: T) {
        if (typeof data === 'function') {
            throwNotSupported();
        }
        this.__data = data;
    }

    subscribe(observer: Observer<T>) {
        const { __observers, __data } = this;
        if (typeof observer !== 'function') {
            throw `Subscribe requires a function.`;
        }
        const id = Symbol();
        __observers[id] = observer;
        observer(__data);
        return (() => delete __observers[id]) as Unsubscriber;
    }

    push(next: T): void
    push(resolve: Updater<T>): void
    push(valueOrResolver: T | Updater<T>): void {
        const { __data: ours, __observers: observers } = this;
        const theirs = typeof valueOrResolver === 'function' ? (valueOrResolver as Function)(ours) : valueOrResolver;
        if (typeof theirs === 'function') {
            throwNotSupported();
        }
        this.__data = theirs;
        for (const key of Object.getOwnPropertySymbols(observers)) {
            const observer = observers[key];
            observer(theirs);
        }
    }
}
