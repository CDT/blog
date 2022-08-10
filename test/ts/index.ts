interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
      return true;
  }
  return false;
}

// error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.


// Type assertion: VALUE as TYPE
// asserts where a value is of type TYPE.
// To prevent the error above, use type assertion:
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
      return true;
  }
  return false;
}

let kat: Cat = {name: 'meow', run: () => { console.log('running') }}

console.log(isFish(kat)) // false


// While type assertion removes errors at compile time
// it may 'hide' your errors at runtime:
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`


