let myName = "rychard";
let age = 20
function logName() {
    console.log(myName+""+age);
}
myName = "Bob";
age = 21
logName();

let myNameArray = ["Chris", "Bob", "Jim"];
let myNumberArray = [10, 15, 40];

console.log (myNameArray[0]); // should return 'Chris'
console.log(myNumberArray[2]); // should return 40

let dog = { name: "Spot", breed: "Dalmatian" };
console.log(dog.name);
console.log(dog.breed);

let myString = "Hello";
typeof mystring;
let myNumber = "500"; // oops, this is still a string
typeof myNumber;
myNumber = 500; // much better — now this is a number
typeof myNumber;

const bird = { species: "Kestrel" };
console.log(bird.species); // "Kestrel"
bird.species = "Striated Caracara";
console.log(bird.species); // "Striated Caracara"

let myFrist = "mubiru";
let myLast = "Rychard";
let fullName = myFrist +" " + myLast
console.log(fullName)

let person = "Linda"
let greeting = "Hi there"
function logMeet() {
    console.log(greeting + ", "+ person+"!")
}
logMeet();

let myPoints = 3
function addPoints(){
    myPoints += 3
}
function reducePoints(){
    myPoints -= 1
}
addPoints();
addPoints();
addPoints();
reducePoints();
reducePoints();
console.log(myPoints)

