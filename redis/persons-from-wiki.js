const dotenv = require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const translit = require('./translit')
const redisc = require('./redisc.js')
const wikiApiUrl = 'https://ru.wikipedia.org/w/api.php'

function fetchPerson(person) {
    return axios.get(wikiApiUrl, {
        params: {
            format: 'json',
            list: 'search',
            action: 'query',
            srsearch: person
        }
    })
    .then(function (response) {
        const {data} = response
        if(!data) return Promise.reject('Data are not found.')
        const {query} = data
        if(!query) return Promise.reject('Query is not found.')
        const {search} = query
        if(!search || !search.length) return Promise.reject('Search array is not found.')
        return Promise.resolve(search[0].pageid)
    })
}

function fetchPageProps(pageId) {
    return axios.get(wikiApiUrl, {
        params: {
            format: 'json',
            action: 'query',
            prop: 'info',
            pageids: pageId,
            inprop: 'url'
        }
    })
    .then(function (response) {
        const {data} = response
        if(!data) return Promise.reject('Data are not found.')
        const {query} = data
        if(!query) return Promise.reject('Query is not found.')
        const {pages} = query
        if(!pages) return Promise.reject('Pages are not found.')
        const page = pages['' + pageId]
        if(!page) return Promise.reject('Page is not found.')
        const {pageid, canonicalurl, title} = page
        return Promise.resolve({pageid, canonicalurl, title})
    })
}


;(async function(){
        const data = fs.readFileSync('persons.txt', 'UTF-8');
        const lines = data.split(/\r?\n/).filter(line => line && line.trim())
        for (const line of lines) {
            try {
                await fetchPerson(line)
                    .then(fetchPageProps)
                    .then(props => {
                        props.name = line
                        const fn = translit(line) //c2t.transform(line, '_').toLowerCase()
                        console.log(line, fn)
                        const key = `wiki:person:${fn}`
                        return redisc.hmsetAsync(key, props)
                    })
            }
            catch(err){
                console.log(err)
            }
        }
        redisc.quit()
})()
