const {
    Eids
} = require('./models');
const {
    ExportS,
    NewEidS
} = require('./models/scopus');
const {
    ExportW,
    NewEidW
} = require('./models/wos');
const exportS = new ExportS();
const exportW = new ExportW();
const eids = new Eids();
const newEidS = new NewEidS();
const newEidW = new NewEidW();


async function main() {
    let newIdScopus = await newEidS.findAll(['eid']);

    await eids.save(newIdScopus);
    await newEidS.truncate();
    await exportS.truncate();

    let newIdWos = await newEidW.findAll(['eid']);
    
    await eids.save(newIdWos);
    await newEidW.truncate();
    await exportW.truncate();
}

module.exports = main;