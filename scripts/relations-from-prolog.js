const fs = require('fs')
const axios = require('axios')
const translit = require('../../backend/wiki-parser/translit')

const url = 'http://localhost:8030/pengine/'
const params = {format: 'json', application: 'silver_age'}

let created = false

const getUrl = id => url + (!id && 'create' || `send?format=json&id=${id}`)

const queryPengine = (query, id) => axios.post(getUrl(id), {...params, ask: query})
    .then(res => Promise.resolve({id: res.data.id, data: res.data.answer}))

;(async function(){
    const person = "Анна Ахматова"
    try{
        let { id, data } = await queryPengine(`персоны(L).`)
        const persons = data.data.data[0].L
        await queryPengine(`destroy.`, id)
        let count = 1
        for(const person of persons){
            //if(++count > 5) break
            const { id, data } = await queryPengine(`связи("${person}", L).`)
            let fn = translit(person)
            const start = `${fn} {\n    ${fn} [label="${person}" shape="box"];`
            let people = data
            if(!people) continue
            people = people.data
            if(!people) continue
            people = people[0]
            if(!people) continue
            people = people.L
            if(!people || !people.length) continue
            let nodes = people.map(pers => `    ${translit(pers)} [label="${pers}"];`)
            let edges = people.map(pers => `    ${fn} -- ${translit(pers)};`)
            await queryPengine(`destroy.`, id)
            fs.writeFileSync(`../public/data/${fn}.txt`, [start, ...nodes, ...edges, '}'].join('\n'))
        }
    }
    catch(err){console.log(err)}
})()
