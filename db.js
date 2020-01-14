const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'postgres', '2653', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

class PaperS {
    constructor(props) {
        this.model = sequelize.define('PaperS', {
            eid: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true
            },
            topic: Sequelize.STRING(4096),
            type: Sequelize.STRING,
            doi: Sequelize.STRING,
            journal: Sequelize.STRING(1024),
            volume: Sequelize.STRING,
            issue: Sequelize.STRING,
            pages: Sequelize.STRING,
            author: Sequelize.STRING(10240),
            affil: Sequelize.STRING(51200),
            year: Sequelize.STRING
        }, {
            freezeTableName: true
        })
        this.model.removeAttribute('id');
    }
    sync() {
        return this.model.sync({
            force: true
        })
    }
    async save(data) {
        console.log(data);
        try {
        return await this.model.bulkCreate(data, {
            fields: ["eid","type","topic","doi","journal","volume","issue","pages","author","affil","year"],
            updateOnDuplicate: ["type","topic","doi","journal","volume","issue","pages","author","affil","year"]
        })
    }    catch(err){
        console.log(err)
    }
}
}
class PaperW {
    constructor(props) {
        this.model = sequelize.define('PaperW', {
            eid: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            topic: Sequelize.STRING(4096),
            type: Sequelize.STRING,
            doi: Sequelize.STRING,
            journal: Sequelize.STRING(1024),
            volume: Sequelize.STRING,
            issue: Sequelize.STRING,
            pages: Sequelize.STRING,
            author: Sequelize.STRING(10240),
            affil: Sequelize.STRING(51200),
            year: Sequelize.STRING
        }, {
            freezeTableName: true
        })
        this.model.removeAttribute('id');
        if(props) { this.data = {
            eid: props ['61'],
            type: props ['13'],
            topic: props ['8'],
            doi: props ['54'],
            journal: props ['9'],
            volume: props ['45'],
            issue: props ['46'],
            pages: (props['51']!='' && props['52']!='')? `${props ['51']}-${props ['52']}`:props ['53'],
            author: props ['5'],
            affil: props ['22'],
            year: props ['44']
        }}
    }
    sync() {
        return this.model.sync({
            force: true
        })
    }
    async save() {
        try {
        return await this.model.create(this.data,{
            fields: ["eid","type","topic","doi","journal","volume","issue","pages","author","affil","year"],
            updateOnDuplicate: ["type","topic","doi","journal","volume","issue","pages","author","affil","year"]
        })
    }   catch(err){
        console.log(err)
    }
}
}
class Author {
    constructor() {
        this.model = sequelize.define('Author', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING,
            alias: Sequelize.STRING,
            inst: Sequelize.STRING,
            cathedra: Sequelize.STRING
        }, {
            freezeTableName: true
        })
    }
    sync() {
        return this.model.sync({
            force: true
        })
    }
}

exports.PaperS = PaperS;
exports.PaperW = PaperW;
exports.Author = Author;
