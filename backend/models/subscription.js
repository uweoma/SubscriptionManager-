const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscription = sequelize.define('Subscription', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  cost: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
},
  frequency: { 
    type: DataTypes.STRING, 
    allowNull: false 
}, 
  renewalDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
},
  category: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
});

module.exports = Subscription;

