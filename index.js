const parserAuthors = require('./author');
const parserScopus = require('./scopus');
const parserWos = require('./wos');
const exportS = require('./scopusExport');
const count = require('./count');

/* main()

async function main() {
    await parserAuthors('data/authors.csv');
    await parserScopus('data/scopus.csv');
    await parserWos('data/savedrecs.csv');
    await dataOutput();
    await count();
    return;
}  */

module.exports = {
    parserAuthors : parserAuthors,
    parserScopus : parserScopus,
    parserWos : parserWos,
    exportS : exportS,
    count : count
}