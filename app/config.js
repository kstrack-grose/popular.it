var path = require('path');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'popularUser',
    password: '',
    database: 'populardb',
    charset: 'utf8',
    VERSION: '0.8.6',
    filename: path.join(__dirname, '../db/popular.sqlite')
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (link) {
      link.increments('id').primary();
      link.string('twitterHandle', 20);
      link.integer('power', 8);
      link.timestamps();
    }).then(function (table) {
      console.log('created table', table);
    });
  }
});

module.exports = db;