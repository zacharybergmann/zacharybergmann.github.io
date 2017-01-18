function objectValues(obj) {
    var output = [];
    for (let key in obj) {
        output.push(obj[key]);
    }
    return output;
}

function keysToString(obj) {
    var strOutput = '';
    for(let key in obj) {
        strOutput = strOutput + key + " ";
    }
    return strOutput.trim();
}

function valuesToString(obj) {
    var arrayOfVals =[];
    for(let key in obj) {
        if(typeof obj[key] === 'string') {
            arrayOfVals.push(obj[key]);
        }
    }
    return arrayOfVals.join(' ');
}

function arrayOrObject(data) {
    if(Array.isArray(data)){
        return 'array';
    } else if(typeof data === 'object' && data !== null && data instanceof Date !== true) {
        return 'object';
    }
}

function capitalizeWord(str) {
    return str.toUpperCase().slice(0,1) + str.slice(1);
}

function capitalizeAllWords(str) {
    var strArray = str.split(/\s+/gi);
    for(let i = 0 ; i < strArray.length ; i++) {
        strArray[i] = capitalizeWord(strArray[i]);
    }
    return strArray.join(" ");
}    

function welcomeMessage(obj) {
    if(obj.name) {
        return 'Welcome ' + capitalizeWord(obj.name) + '!';
    } 
}

function profileInfo(obj) {
    if(obj.name && obj.species) {
        return capitalizeWord(obj.name) + ' is a ' + capitalizeWord(obj.species);
    }
}

function maybeNoises(obj) {
    if(Array.isArray(obj.noises) && obj.noises.length) {
        return obj.noises.join(" ");
    }
    return 'there are no noises';
}

function hasWord(string, word) {
    var regex = new RegExp(word, 'gi');
    if (string.match(regex) !== null && string.match(regex).length ) {
        return true;
    }
    return false;
}

function addFriend(name, obj) {
    obj.friends.push(name);
    return obj;
}

function isFriend(name, obj) {
    for(let i = 0 ; obj.friends && i < obj.friends.length ; i++) {
        if(obj.friends[i] === name) {
            return true;
        }
    }
    return false;
}

function nonFriends(name, listPeople) {
    let outputNonFriends = [];
    var personFriends;  //will friends of name
    for(let i = 0 ; i < listPeople.length ; i++) {
        if(listPeople[i].name === name){
            personFriends = listPeople[i].friends;
        }
    }
    
    //now to find names of nonfriends and add them to outputNonFriends
    //case where name has no friends
    if(personFriends.length === 0) {
        for(let i = 0 ; i < listPeople.length ; i++) {
            if(listPeople[i].name !== name) outputNonFriends.push(listPeople[i].name);
        }
        return outputNonFriends;
    }
    
    //now the case where personFriends has values
    for (let i = 0 ; i < listPeople.length ; i++) {
        for(let j = 0 ; j < personFriends.length ; j++) {
            if(listPeople[i].name === personFriends[j] || listPeople[i].name === name) {
                break;
            }
            if(listPeople[i].name !== personFriends[j] && j === personFriends.length - 1) {
                outputNonFriends.push(listPeople[i].name);
            }
        }
    }  
    console.log(outputNonFriends);
    return outputNonFriends;
} 

function updateObject(obj, key, value) {
    obj[key] = value;
    return obj;
}

function removeProperties(obj , strArray) {
    for(let i = 0 ; i < strArray.length ; i++) {
        delete obj[strArray[i]];
    }
}

function dedup(input) {
    var output = [];
    output.push(input[0]);
    for(let i = 1 ; i < input.length ; i++) {
        for(let j = 0 ; j < output.length ; j++) {
            if(output[j] === input[i]) {
                break;
            }
            if (j === output.length - 1 && output[j] !== input[i]){
                output.push(input[i]);
            }
        }
    }
    return output;
}


