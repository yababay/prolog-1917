const redisc = require('./redisc.js');

module.exports = close => redisc.keysAsync('wiki:*')
    .then(keys => Promise.all(keys.map(key => redisc.hgetallAsync(key))))
    .then(persons => {
        if(close) redisc.quit()
        return Promise.resolve(close ? {persons} : {persons, redisc})
    })
