// Basic Types
let num = 2; // type is inferred as number
let int : number = 0;
let text : string = 'Lorem Ipsum';
let alive : boolean = true;
let surprise : any = 'surprise';
let nothing = ():void => {};

// Tuples
let entry : [number, string] = [0, 'Lorem'];

// Arrays
let nums : number[] = [1, 2, 3];
let dump : any[] = [1, 'Lorem', true];

// Array of tuples
let entries : [number, string][] = [
    [0, 'Lorem'],
    [1, 'Ipsum']
];

// Unions
let pos : number | string = 1;
pos = '#last';

// Enums
enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}
enum Cardinals {
    North =  1,
    South =  3,
    East, // 4
    West, // 5
}
enum Clients {
    John =  'John Smith',
    Jane =  'Jane Smith',
    Jack =  'Jack Smith',
}

// Objects
let john : {
    name : string, age : number, alive : boolean,
} = {
    name: 'John', age: 30, alive: true,
};

type Person = {
    name : string,
    age : number,
    alive? : boolean, // optional property
};

let jane : Person = {
    name: 'Jane', age: 31,
};

// Type Assertion - Type casting
let something: any = 0;
let something2 = <number>something;
let something3 = something as number;

// Functions
function add(a: number, b: number): number { return a + b; }
const multiply = (a: number, b: number):number => (a * b);

// Interfaces
// ( cant use primitives or unions )
interface User {
    readonly id: number, // readonly - cant change value
    name: string,
}

interface MathFunc {
    (a: number, b: number): number;
}
const sub: MathFunc = (a, b) => a - b;

// Classes
class Dog {

    name: string;                   // public by default
    public age: number = 0;         // accesible everywhere
    protected breed: string;        // only available in derived classes
    private meta: boolean = true;   // accesible only from inside the class

    constructor(
        name: string,
        breed: string = 'Unknown'
    ) {
        this.name = name;
        this.breed = breed;
    }
    bark() {
        console.log('Bark!');
        this.meta && console.log('breed: ' + this.breed);
    }
}
let firulais = new Dog('Firulais');

interface CatInterface {
    name: string,
    age: number,
    meow(): void,
}

class Cat implements CatInterface {
    name;
    age;
    alive : boolean = true;

    constructor(name: string, age: number) {
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
new TomCat ('Tom', 2).meow();

// Generics
function sort<T>(arr: T[]): T[] {
    return arr.sort();
}
const invsort = <T>(arr: T[] ) : T[] => arr.sort();

const getDeadCat = <T extends Cat>( cat : T ) : T => {cat.alive = false; return cat;};