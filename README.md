A simple `Subject` for the observer pattern.

## Documentation

### `Subject` Class
Holds a bit of state and a list of subscribers.

#### Constructor
Requires one parameter representing the initial state.

```ts
const subject = new Subject(0);
```

#### Protected Fields
If you'd like to extend `Subject`, note the following protected (using typescript) fields are available
 - `__data: T`: the current state.
 - `__observers: Record<symbol, Observer<T>>`: a record of all currently subscribed observers.

#### Methods

 - `subscribe(observer: Observer<T>): Unsubscriber`: adds an observer to notify when a change is pushed. Also immediately calls the observer with the current state.
 - `push(next: T): void`: push a change to observers. Other overloads:
   - `push(resolve: Updater<T>): void`

#### Type Declaration
Where `T` is the type of data passed to the `Subject` instance.

```ts
type Observer<T> = (d?: T) => any;
type Unsubscriber = () => boolean;
type Updater<T> = (v?: T) => T;
```

### Example

```ts
// Create a new Subject (T = string)
const subject = new Subject('world');

// Add an observer:
const unsubscribe = subject.subscribe(v => console.log(`hello  ${v}`)); // logs "hello world"

// Push an update
subject.push('there'); // logs "hello there"

// Unsubscribe observer when done listening for changes.
unsubscribe(); // returns true
// subject.push('...') won't call the above observer anymore.
```
