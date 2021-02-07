const redisc = require('./redisc.js');

module.exports = redisc.keysAsync('wiki:*')
    //.then(keys => Promise.all(keys.map(key => redisc.hgetallAsync(key).then(obj => ({...obj, id: key.match(/\:[a-z_]+$/)[0].replace(':', '')})))))
    .then(keys => Promise.all(keys.map(key => redisc.hgetallAsync(key).then(obj => ({...obj, id: key.match(/[^\:]+$/)[0]})))))
    .then(arr => {
        redisc.quit()
        return Promise.resolve(arr)
    })
