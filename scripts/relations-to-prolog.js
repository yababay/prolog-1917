const fs = require('fs')

fs.readFileSync('relations.md').toString().split(/\r?\n/g).forEach(line => {
    if(/^[\%\#]/.test(line) || !line.trim()) return
    const [person1, person2, link] = line.trim().split(',').map(el => el.trim())
    if(!person2) return
    console.log(`связь("${person1}", "${person2}", ${!link ? "hz" : '"' + link + '"'}).`)
})

