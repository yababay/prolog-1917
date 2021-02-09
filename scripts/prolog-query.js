const axios = require('axios')
const translit = require('./translit')

const url = 'http://localhost:8030/pengine/'
const params = {format: 'json', application: 'silver_age'}
const getUrl = id => url + (!id && 'create' || `send?format=json&id=${id}`)

const prologQuery = (query, id) => axios.post(getUrl(id), {...params, ask: query})
    .then(res => {
        const {id, answer} = res.data
        return Promise.resolve({id, answer})
    })

module.exports = prologQuery
