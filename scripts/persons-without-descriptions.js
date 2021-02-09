const prologQuery = require('./prolog-query')

;(async function(){
    try{
        const {id, answer} = await prologQuery(`не_описаны(L).`)
        await prologQuery(`destroy.`, id)
        for(const person of answer.data.data[0].L) console.log(person)
    }
    catch(err){console.log(err)}
})()
