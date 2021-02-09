const getPersons = require('./persons')

;(async function() {
    const {persons} = await getPersons(true)
    persons.forEach(el => console.log(JSON.stringify(el)))
})()
