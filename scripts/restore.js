const fs = require('fs')
const redisc = require('./redisc')
const translit = require('./translit')

;(async function(){
    const persons = fs.readFileSync('../backup/last.json').toString().split(/\r?\n/).filter(el => /^\{/.test(el)).map(pers => {
        pers = JSON.parse(pers)
        const key = `wiki:person:${translit(pers.name)}`
        return {key, pers}
    })
    await Promise.all(persons.map(({key, pers}) => console.log(key) || redisc.hmsetAsync(key, pers)))
    redisc.quit()
})()
