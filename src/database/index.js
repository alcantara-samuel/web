const {Pool} = require('pg');

const conect = new Pool({
    connectionString: 'postgres://rfgmclmx:jUnNQZrd7sQI_z7P9n0x3EuofL7DymqQ@kesavan.db.elephantsql.com/rfgmclmx'
});

module.exports = conect;
