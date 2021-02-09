const {readline, getGender} = require('./readline');
const translit = require('./translit');
const getPersons = require('./persons');

;(async function(){
    const {persons, redisc} = await getPersons()
    for(const person of persons){
        if(person.gender) continue
        const gender = await getGender(person)
        const key = `wiki:person:${translit(person.name)}`
        await redisc.hsetAsync(key, 'gender', gender)
    }
    redisc.quit()
    readline.close()
})()
