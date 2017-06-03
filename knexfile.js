module.exports = {
  development: {
    seeds: {
      directory: './server/seeds/'
    },
    client: 'postgresql',
    connection: {
      database: 'noatdev',
      user: 'root',
      password: ''
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/server/migrations"
    }
  },
  test: {
    seeds: {
      directory: './server/seeds/'
    },
    client: 'postgresql',
    connection: process.env.TEST_DATABASE_URL || {
      database: 'noattest',
      user: 'root',
      password: ''
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/server/migrations"
    }
  },
  production: {
    client: 'postgresql',
    seeds: {
      directory: './server/seeds/'
    },
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + "/server/migrations"
    }
  }
};
