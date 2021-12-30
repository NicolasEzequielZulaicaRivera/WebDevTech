"use strict";
// Basic Types
let num = 2; // type is inferred as number
let int = 0;
let text = 'Lorem Ipsum';
let alive = true;
let surprise = 'surprise';
let nothing = () => { };
// Tuples
let entry = [0, 'Lorem'];
// Arrays
let nums = [1, 2, 3];
let dump = [1, 'Lorem', true];
// Array of tuples
let entries = [
    [0, 'Lorem'],
    [1, 'Ipsum']
];
// Unions
let pos = 1;
pos = '#last';
// Enums
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var Cardinals;
(function (Cardinals) {
    Cardinals[Cardinals["North"] = 1] = "North";
    Cardinals[Cardinals["South"] = 3] = "South";
    Cardinals[Cardinals["East"] = 4] = "East";
    Cardinals[Cardinals["West"] = 5] = "West";
})(Cardinals || (Cardinals = {}));
var Clients;
(function (Clients) {
    Clients["John"] = "John Smith";
    Clients["Jane"] = "Jane Smith";
    Clients["Jack"] = "Jack Smith";
})(Clients || (Clients = {}));
// Objects
let john = {
    name: 'John', age: 30, alive: true,
};
let jane = {
    name: 'Jane', age: 31,
};
// Type Assertion - Type casting
let something = 0;
let something2 = something;
let something3 = something;
// Functions
function add(a, b) { return a + b; }
const multiply = (a, b) => (a * b);
const sub = (a, b) => a - b;
// Classes
class Dog {
    constructor(name, breed = 'Unknown') {
        this.age = 0; // accesible everywhere
        this.meta = true; // accesible only from inside the class
        this.name = name;
        this.breed = breed;
    }
    bark() {
        console.log('Bark!');
        this.meta && console.log('breed: ' + this.breed);
    }
}
let firulais = new Dog('Firulais');
class Cat {
    constructor(name, age) {
        this.alive = true;
        this.name = name;
        this.age = age;
    }
    meow() {
        console.log('Meow!');
    }
}
class TomCat extends Cat {
    meow() {
        this.alive && console.log('Tom meow!');
    }
}
new TomCat('Tom', 2).meow();
// Generics
function sort(arr) {
    return arr.sort();
}
const invsort = (arr) => arr.sort();
const getDeadCat = (cat) => { cat.alive = false; return cat; };
