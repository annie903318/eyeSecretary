
// function Menu_Database(){
//     //連接環境變量指定的數據庫
//     const { Pool } = require('pg');
//     const pool = new Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
//     this.db_disease_return = function(type, number) {
//       pool.connect(function(err, pp, done){
//         if(err){
//           return "connect error";
//         }
//         pp.query('SELECT description FROM disease WHERE type = 1 AND number = 1', function(err, result){
//           if(err){
//             return "query error";
//           }
//           // const results = { 'results': (result) ? result.rows : null};
//           // let ss = JSON.parse(JSON.stringify(results));
//           return "query success";
//         });
//       });
//     };
// };
// module.exports = Menu_Database;