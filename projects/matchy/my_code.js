/*            Part 1            */

// step 1 //
var animal = {};
animal.species = 'otter';
animal["name"] = "Floppy";
animal.noises = [];
console.log(animal);

// Step 2 //
let noises = [];
noises[0] = 'ern ernn';
noises.push('grrr');
noises.unshift('hrnn');
noises[noises.length] = 'arrrr';
console.log(noises.length);
console.log(noises[noises.length - 1]);
console.log(noises);

// Step 3 //
animal["noises"] = noises;
animal.noises.push('rawr');
console.log(animal);

// Step 4 //
//Ways to access properties of an object? - Using dot notation or bracket notation
//Ways to access values of an array?  - Use bracket notation zero indexed 

// Step 5 //
//BREAK!

// Step 6 //
var animals = [];
animals.push(animal);
console.log(animals);
var duck = {
    species: 'duck',
    name: 'Jerome',
    noises: ['quack', 'honk', 'sneeze', 'woosh']
};

animals.push(duck);

var dog = {
    name: 'Benji',
    species: 'basset hound',
    noises: ["woof", "arf", "arooo"]
};
animals.push(dog);

var cat = {
    name: "Baby",
    species: "tabby",
    noises: ["rarn", "meow"]
};
animals.push(cat);

console.log(animals);
console.log(animals.length);

// Step 7 //
var friends = [];
function randomAnimalObj(array) {
    return array[Math.floor(Math.random() * array.length)];
}
friends.push(randomAnimalObj(animals));
console.log(friends);
animals[0].friends = friends;

// Step 8 //
//Break!

/*            Part 2           */

// Step 1 //
function search(animalName) {
    for(let i = 0 ; i < animals.length ; i++) {
        if(animals[i].name.toLowerCase() === animalName.toLowerCase()) {
            return animals[i];
        }
    }
    return null;
}

// Step 2 //
function edit(animalName, replacingObj) {
    for(let i = 0 ; i < animals.length ; i++) {
        if(animals[i].name.toLowerCase() === animalName.toLowerCase()) {
            animals[i] = replacingObj;
        }
    }
}

// Step 3 //
function remove(animalName) {
    console.log(animals, "animals on line 81");
    for(let i = 0 ; i < animals.length ; i++) {
        if(animals[i].name.toLowerCase() === animalName.toLowerCase()) {
            animals.splice(i, 1);
        }
    }
}

// Step 4 //
function create(newAnimalObj) {
    if(newAnimalObj.name.length > 0 && newAnimalObj.species.length > 0) {
        for(let i =0 ; i < animals.length ; i++) {
            if(animals[i].name.toLowerCase() === newAnimalObj.name.toLowerCase()) {
                return 'failed';
            }
        }
        animals.push(newAnimalObj);
        console.log(animals);
    }
}

//Step 5 // 
//Break!




