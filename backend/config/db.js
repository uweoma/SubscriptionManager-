const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('subscription_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Postgres connected'))
  .catch(err => console.log('Error:', err));

module.exports = sequelize;
