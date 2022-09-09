module.exports = {
  "development": {
    "username": "root",
    "password": "123456",
    "database": "bitcoin",
    "host": process.env.DATABASE_HOST || '127.0.0.1',
    "dialect": "mysql",
    "port": 3306,
    "insecureAuth" : true
  },
  "test": {
    "username": "root",
    "password": "123456",
    "database": "bitcoin",
    "host": process.env.DATABASE_HOST || '127.0.0.1',
    "dialect": "mysql",
    "port": 3306,
    "insecureAuth" : true
  },
  "production": {
    "username": "root",
    "password": "123456",
    "database": "bitcoin",
    "host": process.env.DATABASE_HOST || '127.0.0.1',
    "dialect": "mysql",
    "port": 3306,
    "insecureAuth" : true
  }
}
