const path = require('path')

const defaults = {
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, '/migrations')
  }
}

const sqliteDefaults = Object.assign({
  client: 'sqlite3',
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, cb) =>
      conn.run('PRAGMA foreign_keys = ON', cb)
  }
}, defaults)

const postgresDefaults = Object.assign({
  client: 'postgresql',
  pool: {
    min: process.env.DATABASE_POOL_MIN,
    max: process.env.DATABASE_POOL_MAX
  }
}, defaults)

module.exports = {
  development: Object.assign({
    connection: {
      filename: path.join(__dirname, 'dev.sqlite')
    }
  }, sqliteDefaults),
  // development: Object.assign({
  //   client: 'postgresql',
  //   connection: {
  //     host: 'punga.local',
  //     database: 'postgres',
  //     user: 'graham',
  //     password: 'p'
  //   },
  //   migrations: {
  //     directory: '../../server/db/migrations'
  //   },
  //   useNullAsDefault: true
  // }, postgresDefaults),

  test: Object.assign({
    connection: {
      filename: ':memory:'
    },
    seeds: {
      directory: path.join(__dirname, '../../tests/server/db/seeds')
    }
  }, sqliteDefaults),

  staging: Object.assign({
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    }
  }, postgresDefaults),

  production: Object.assign({
    connection: process.env.DATABASE_URL
  }, postgresDefaults)
}
