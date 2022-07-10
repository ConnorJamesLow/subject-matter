**Subject Matter** provides a simple subject for the observer pattern.  

```ts
import Subject from 'subject-matter';

const s = new Subject(0);

const unsubscribe = s.subscribe(v => console.log('value is', v));

s.update(1); // Outputs "value is 1" to the console.
unsubscribe();
s.update(2); // Does nothing.
```