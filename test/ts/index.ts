type Cat = { name: string, purrVelocity: number };
var Cat = { slideStuffOffTheTable: true };

// This works well. 'type cat' statement is removed after compiling to javascript.

class Dog {
  isDog () {
    return true;
  }
}

// This is fine
var dog: Dog; 
// This is wrong, Syntax error 'Dog' has already been declared.
var Dog = {a:1};