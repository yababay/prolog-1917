const CyrillicToTranslit = require('cyrillic-to-translit-js')
const cyrillicToTranslit = new CyrillicToTranslit()

module.exports = line => cyrillicToTranslit.transform(line, '_').toLowerCase().replace(/\-/g, '_')

