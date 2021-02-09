const getPersons = require('./persons')

;(async function(){
    const {persons} = await getPersons(true)
    for(const person of persons){
        const {name, gender, birthYear, deathYear} = person
        console.log(`персона("${name}", "${gender}", ${birthYear || 0}, ${deathYear || 0}).`)
    }
})()
