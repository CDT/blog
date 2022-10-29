function Car(name, year) {
  this.name = name
  this.year = year
}

Car.prototype.age = function (x) {
  return `it is ${x - this.year} years old`
}

Car.prototype.age1 = x => this

const myCar = new Car("Ford", 2014)

console.log(myCar)
// Car { name: 'Ford', year: 2014 }

console.log(myCar.age(2022))
// it is 8 years old

console.log(myCar.age1(2022))