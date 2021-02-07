const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const axios = require('axios')
const persons = require('./persons')
const translit = require('../wiki-parser/translit')

const fromUrl = (url, absent) => axios.get(url)
  .then(res => {
      const { document } = new JSDOM(res.data).window
      const people = []
      let name = document.querySelector('h1.section-head__title')
      if(!name) return Promise.reject('Не найдено имя ' + url)
      name = name.textContent.trim()
      const arr = Array.from(document.querySelectorAll('.hero-info-person'))
      arr.forEach(a => {
          const cells = Array.from(a.querySelectorAll('.hero-info-person_cell'))
              .map(el => !el && '' || el.textContent.trim()).filter(el => el)
          const pers = cells.length == 1 ? cells[0] : cells[1]
          if(!persons.get(translit(pers))){
              absent.add(pers)
          }
          people.push(cells)
      })
      if(!people.length) return Promise.reject('Массив связей пуст: ' + url)
      const id = translit(name)
      if(!persons.get(id)){
          absent.add(name)
      }
      return Promise.resolve({name, people, id})
  })


;(async function(){
    const urls = fs.readFileSync('./heroes.txt').toString('utf8').split(/\r?\n/) //.filter((el, i) => i < 5)
    const absent = new Set
    const persons = []
    for(const url of urls){
        try{
            const person = await fromUrl(url, absent)
            const {people, name} = person
            people.forEach(arr => {
                let [rel, pers] = arr
                if(!pers) {pers = rel; rel = null}
                if(rel) rel = rel.toLowerCase()
                fs.appendFileSync('relations.pl', `связь("${name}", "${pers}", ${rel ? '"' + rel + '"' : 'hz'}).\n`)
            })
        }
        catch(err){
            console.log(err)
        }
    }
    Array.from(absent).forEach(name => fs.appendFileSync('absent.txt', name + '\n'))
})()
