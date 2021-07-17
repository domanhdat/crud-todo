const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

const connectPromise = function () {
  return new Promise((resolve, reject) => {
    return connection.connect(function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    })
  })
}

module.exports = connectPromise;
