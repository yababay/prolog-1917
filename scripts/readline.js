const readline = require('readline');
const persons = require('./persons');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getGender = person => new Promise(yep => {
    rl.question(`Какого пола ${person.name} (м/ж)? `, answer => {
        if(!/^[мж]$/.test(answer)) answer = 'м'
        yep(answer)
    })  
})

module.exports = {readline: rl, getGender}
